import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createCoin } from '@zoralabs/coins-sdk';
import { Hex, createWalletClient, createPublicClient, http, Address } from 'viem';
import { base } from 'viem/chains';

import axios from 'axios';
import FormData from 'form-data';

// =========== Infura Credentials ==========
const projectId = "f66c36dd3ec047f0bac42842aa9a1344";
const projectSecret = "GJXTUZnJGNXUqg0HSYNuKnBw84XLG/txieF/QCpy+mibw32su/O0pA";
const authHeader = 'Basic ' + Buffer.from(`${projectId}:${projectSecret}`).toString('base64');

/**
 * Pin an existing CID to Infura IPFS using Axios.
 * Mirrors the original https.request code, but with Axios.
 */
async function pinCID(cid: string): Promise<string> {
  // Equivalent to:
  //  POST /api/v0/pin/add?arg=<CID>
  // with Basic Auth <projectId>:<projectSecret>

  const url = `https://ipfs.infura.io:5001/api/v0/pin/add?arg=${cid}`;
  

  // Use “auth” option or the Authorization header. Here we’ll do an explicit header:
  const response = await axios.post(url, null, {
    headers: {
      Authorization: authHeader,
    },
    // or you could do:
    // auth: { username: projectId, password: projectSecret }
  });

  if (response.status !== 200) {
    throw new Error(`Failed to pin CID. Status: ${response.status} - ${response.statusText}`);
  }

  // Infura usually returns JSON with "Pins" or a pinned object. Just return raw text or JSON
  return JSON.stringify(response.data);
}

/**
 * Upload a file (Buffer) to IPFS via Infura using /api/v0/add?pin=true
 * Returns the IPFS hash (CID).
 */
async function uploadToIPFS(fileBuffer: Buffer): Promise<string> {
  const formData = new FormData();
  formData.append('file', fileBuffer, { filename: 'file' });

  const response = await axios.post(
    'https://ipfs.infura.io:5001/api/v0/add?pin=true',
    formData,
    {
      headers: {
        Authorization: authHeader,
        ...formData.getHeaders(),
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`Failed to upload to IPFS. Status: ${response.status}`);
  }

  // The response data includes { Name, Hash, Size }
  return response.data.Hash; // or response.data.Path
}

// =========== viem Setup ==========
const publicClient = createPublicClient({
  chain: base,
  transport: http('https://base-sepolia.drpc.org'),
});

const walletClient = createWalletClient({
  account: '0xd067782dbaefe271fc16fc8c84531445320c6a79' as Hex,
  chain: base,
  transport: http('https://base-sepolia.drpc.org'),
});

/**
 * Create the coin by calling @zoralabs/coins-sdk
 */
async function createMyCoin(
  name: string,
  symbol: string,
  uri: string,
  payoutRecipient: string
) {
  try {
    const coinParams = {
      name,
      symbol,
      uri,
      payoutRecipient: payoutRecipient as Address,
    };

    const result = await createCoin(coinParams, walletClient, publicClient);

    console.log('Transaction hash:', result.hash);
    console.log('Coin address:', result.address);
    console.log('Deployment details:', result.deployment);

    return result;
  } catch (error) {
    console.error('Error creating coin:', error);
    throw error;
  }
}

/**
 * Lambda Handler
 */
export const lambdaHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    // 1) Log the incoming event
    console.log('Received event:', JSON.stringify(event));

    // 2) Parse request body
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

    // 3) Build some JSON metadata
    const metadata = {
      name: requestData.name,
      description: requestData.description,
      image: "", // Will fill in after uploading an image
      properties: {
        category: "social",
      },
    };

    // 4) Upload the metadata (without image) to IPFS
    const metadataBuffer = Buffer.from(JSON.stringify(metadata));
    const metadataHash = await uploadToIPFS(metadataBuffer);
    console.log("Initial JSON CID:", metadataHash);
    const jsonUri = `ipfs://${metadataHash}`;

    // 5) Simulate an image upload (replace with real data)
    const imageBuffer = Buffer.from("...binary image data...", "binary");
    const imageHash = await uploadToIPFS(imageBuffer);
    console.log("Image CID:", imageHash);
    const imageUri = `ipfs://${imageHash}`;

    // 6) Update metadata with image URI, re-upload
    metadata.image = imageUri;
    const updatedMetadataBuffer = Buffer.from(JSON.stringify(metadata));
    const updatedMetadataHash = await uploadToIPFS(updatedMetadataBuffer);
    console.log("Updated JSON CID:", updatedMetadataHash);
    const updatedJsonUri = `ipfs://${updatedMetadataHash}`;

    // (Optional) Pin the final metadata CID if you want
    // You can call pinCID() to explicitly pin the final IPFS hash
    // await pinCID(updatedMetadataHash);

    // 7) Create a coin using the final metadata URI
    const coinParams = {
      name: requestData.name,
      symbol: requestData.symbol,
      uri: updatedJsonUri,
      payoutRecipient: "0xd067782dbaefe271fc16fc8c84531445320c6a79" as Address,
    };
    const res = await createMyCoin(
      coinParams.name,
      coinParams.symbol,
      coinParams.uri,
      coinParams.payoutRecipient
    );

    // 8) Log and return a success response
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
