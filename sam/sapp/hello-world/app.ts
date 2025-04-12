import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createCoin } from "@zoralabs/coins-sdk";
import { Hex, createWalletClient, createPublicClient, http, Address } from "viem";
import { base } from "viem/chains";
 
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
 
// Set up viem clients
const publicClient = createPublicClient({
  chain: base,
  transport: http("<RPC_URL>"),
});
 
const walletClient = createWalletClient({
  account: "0x<YOUR_ACCOUNT>" as Hex,
  chain: base,
  transport: http("<RPC_URL>"),
});
 
// Define coin parameters
const coinParams = {
  name: "My Awesome Coin",
  symbol: "MAC",
  uri: "ipfs://bafybeigoxzqzbnxsn35vq7lls3ljxdcwjafxvbvkivprsodzrptpiguysy",
  payoutRecipient: "0xYourAddress" as Address,
  platformReferrer: "0xOptionalPlatformReferrerAddress" as Address, // Optional
  initialPurchaseWei: 0n, // Optional: Initial amount to purchase in Wei
};
 
// Create the coin
async function createMyCoin() {
  try {
    const result = await createCoin(coinParams, walletClient, publicClient);
    
    console.log("Transaction hash:", result.hash);
    console.log("Coin address:", result.address);
    console.log("Deployment details:", result.deployment);
    
    return result;
  } catch (error) {
    console.error("Error creating coin:", error);
    throw error;
  }
}

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // Log the entire event for debugging purposes
        console.log('Received event:', JSON.stringify(event));

        // Initialize a variable to hold the parsed body.
        let requestData: any = {};
        if (event.body) {
            try {
                // Assume the request body is a JSON string
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

        // For demonstration, suppose we expect a property "name" in the request
        const name = requestData.name || 'guest';

        // Execute your core logic here using the input data. For example:
        const responseMessage = `Hello, ${name}! Welcome to our API.`;

        // Build and return a successful response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: responseMessage,
                receivedData: requestData, // Echo back the received data
            }),
        };
    } catch (err) {
        // Log the error for debugging
        console.error('Unexpected error:', err);

        // Return an internal server error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Some error happened',
            }),
        };
    }
};
