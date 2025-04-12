import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createCoin } from '@zoralabs/coins-sdk';
import { Hex, createWalletClient, createPublicClient, http, Address } from 'viem';
import { base } from 'viem/chains';

import axios from 'axios';
import FormData from 'form-data';

type CreateCoinArgs = {
    name: string;             // The name of the coin (e.g., "My Awesome Coin")
    symbol: string;           // The trading symbol for the coin (e.g., "MAC")
    uri: string;              // Metadata URI (an IPFS URI is recommended)
    owners?: Address[];       // Optional array of owner addresses, defaults to [payoutRecipient]
    tickLower?: number;       // Optional tick lower for Uniswap V3 pool, defaults to -199200
    payoutRecipient: Address; // Address that receives creator earnings
    platformReferrer?: Address; // Optional platform referrer address, earns referral fees
    initialPurchaseWei?: bigint; // Optional initial purchase amount in wei
  }

const walletAddress = "0xfF025f47461755AADED95Ce9dF5A196945180Bfc";

// =========== Pinata Credentials ==========
const pinataApiKey = "117b984c2537d405227d";
const pinataSecretApiKey = "a509e44c29ea215af443e56e8ca10e90f4ead9ca6435f97b916fef63cd9b4ac5";

// =========== Helper Functions ==========

/**
 * Upload JSON metadata to Pinata using the pinJSONToIPFS endpoint.
 * Returns the IPFS hash (CID).
 */
async function uploadJSONToPinata(jsonContent: object): Promise<string> {
  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const response = await axios.post(
    url,
    {
      pinataMetadata: {
        name: (jsonContent as any).name || "Metadata",
      },
      pinataContent: jsonContent,
    },
    {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`Failed to upload JSON to Pinata. Status: ${response.status}`);
  }
  // The response data contains an "IpfsHash" property.
  return response.data.IpfsHash;
}

/**
 * Upload a file (Buffer) to Pinata using the pinFileToIPFS endpoint.
 * Returns the IPFS hash (CID).
 */
async function uploadFileToPinata(fileBuffer: Buffer, filename: string = "file"): Promise<string> {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
  const formData = new FormData();
  formData.append("file", fileBuffer, { filename });

  const response = await axios.post(url, formData, {
    headers: {
      // Merge formData headers (which include the proper Content-Type boundary)
      ...formData.getHeaders(),
      pinata_api_key: pinataApiKey,
      pinata_secret_api_key: pinataSecretApiKey,
    },
  });

  if (response.status !== 200) {
    throw new Error(`Failed to upload file to Pinata. Status: ${response.status}`);
  }
  // The response data includes "IpfsHash" property.
  return response.data.IpfsHash;
}

// =========== viem Setup ==========
const publicClient = createPublicClient({
  chain: base,
  transport: http('https://base-sepolia.drpc.org'),
});

const walletClient = createWalletClient({
  account: walletAddress as Hex,
  chain: base,
  transport: http('https://base-sepolia.drpc.org'),
});

/**
 * Create the coin by calling @zoralabs/coins-sdk.
 */
/**
 * Lambda Handler
 */
export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // 1) Log the incoming event.
    console.log('Received event:', JSON.stringify(event));

    // 2) Parse the request body.
    let requestData: any = {};
    if (event.body) {
      try {
        requestData = JSON.parse(event.body);
        console.log(requestData);
      } catch (parseError) {
        console.error('Error parsing JSON from event body:', parseError);
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Invalid JSON in request body',
          }),
        };
      }
    }

    // 3) Build JSON metadata.
    const metadata = {
      name: requestData.name,
      description: requestData.description,
      image: "", // Will be filled after image upload.
      properties: {
        category: "social",
      },
    };

    // 4) Upload the metadata (without image) to Pinata.
    const initialMetadataHash = await uploadJSONToPinata(metadata);
    console.log("Initial JSON CID:", initialMetadataHash);
    const jsonUri = `ipfs://${initialMetadataHash}`;

    // 5) Simulate an image upload (replace with real image data).
    const imageBuffer = Buffer.from("...binary image data...", "binary");
    const imageHash = await uploadFileToPinata(imageBuffer, "image.png");
    console.log("Image CID:", imageHash);
    const imageUri = `ipfs://${imageHash}`;

    // 6) Update metadata with the image URI and re-upload.
    metadata.image = imageUri;
    const updatedMetadataHash = await uploadJSONToPinata(metadata);
    console.log("Updated JSON CID:", updatedMetadataHash);
    const updatedJsonUri = `ipfs://${updatedMetadataHash}`;

    // 7) Create a coin using the final metadata URI.
    const coinParams: CreateCoinArgs = {
      name: requestData.name,
      symbol: requestData.symbol,
      uri: updatedJsonUri,
      payoutRecipient: walletAddress as Address,
      platformReferrer: walletAddress as Address,
      initialPurchaseWei: 0n,
    };

    const res = await createCoin(coinParams, walletClient, publicClient);

    // 8) Log and return a success response.
    console.log("Transaction hash:", res.hash);
    console.log("Coin address:", res.address);
    console.log("Deployment details:", res.deployment);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Coin created on " + res.address,
        receivedData: res.deployment,
      }),
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Some error happened',
      }),
    };
  }
};
