from web3 import Web3
from eth_account import Account
import json
import os

RPC_URL = "https://sepolia.base.org"

# Zora Sepolia Testnet Chain ID
CHAIN_ID = 84532

# Replace with your wallet's private key (handle securely)
PRIVATE_KEY = "5d384c5c224b00c965234fd11d9ccb2b523f1c0d57de076346cf8017c2c35d6a"  # It's safer to set this as an environment variable

# # Load ABI and Bytecode
with open('CoinABI.json') as abi_file:
    abi = json.load(abi_file)

with open('CoinBytecode.txt') as bytecode_file:
    bytecode = bytecode_file.read().strip()

# Initialize Web3
w3 = Web3(Web3.HTTPProvider(RPC_URL))
assert w3.is_connected(), "Failed to connect to the Zora Sepolia Testnet"

# Set up account
account = Account.from_key(PRIVATE_KEY)
sender_address = account.address

# owners = [sender_address]  # List of owner addresses
# payout = sender_address    # Address to receive payouts
# name = "MyToken"
# symbol = "MTK"
# uri = "ipfs://YourMetadataHash"  # Replace with your actual metadata URI

# name = "mytoken"
# symbol = "wtf"
# uri = "ipfs://bafkreigxntpntgsynz46nolg7bdu3rrkins36eexpqhslzw3pm5imxu3eu"
# payoutRecipient = '0x48Ef38507Fb66feF13B8F06409746572496c4A2f'
# platformReferrer = '0x48Ef38507Fb66feF13B8F06409746572496c4A2f'
# initialPurchaseWei = w3.to_wei(0.1, 'ether')

CoinContract = w3.eth.contract(abi=abi, bytecode=bytecode)

protocol_reward_recipient = "0x8e8aA0a4312178E04553da4aF68Ec376c673d86E"  
protocol_rewards = "0x8e8aA0a4312178E04553da4aF68Ec376c673d86E"          
weth = "0x4200000000000000000000000000000000000006"                      
v3_factory = "0x4752ba5DBc23f44D87826276BF6Fd6b1C372aD24"                 
swap_router = "0x6B36d761981d82B1e07cF3c4daF4cB4615c4850a"               
airlock = "0x660eAaEdEBc968f8f3694354FA8EC0b4c5Ba8D12"   

# Create contract instance
CoinContract = w3.eth.contract(abi=abi, bytecode=bytecode)

nonce = w3.eth.get_transaction_count(sender_address)
transaction = CoinContract.constructor(
    protocol_reward_recipient,
    protocol_rewards,
    weth,
    v3_factory,
    swap_router,
    airlock
).build_transaction({
    'from': sender_address,
    'nonce': nonce,
    'gas': 5000000,
    'gasPrice': w3.eth.gas_price,
    'chainId': 999999999  # Zora Sepolia Testnet Chain ID
})

signed_txn = account.sign_transaction(transaction)

# Send transaction
tx_hash = w3.eth.send_raw_transaction(signed_txn.raw_transaction)
print(f"Transaction sent with hash: {tx_hash.hex()}")

# Wait for transaction receipt
tx_receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
print(f"Contract deployed at address: {tx_receipt.contractAddress}")