from flask import Flask, render_template, request
from web3 import Web3, HTTPProvider
import json

app = Flask(__name__)

# Connect to Ethereum network
eth_rpc_endpoint = "https://eth-sepolia.g.alchemy.com/v2/l3A-ilzM6QrVGLzWR8eicJnW3wW51drm"
web3 = Web3(HTTPProvider(eth_rpc_endpoint))

# Contract ABI (interface)
abi = json.loads('[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"creationId","type":"uint256"},{"indexed":false,"internalType":"string","name":"userName","type":"string"},{"indexed":false,"internalType":"string","name":"aadhaarNumber","type":"string"},{"indexed":false,"internalType":"string","name":"creationName","type":"string"},{"indexed":false,"internalType":"string","name":"creationDetails","type":"string"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"CreationAdded","type":"event"},{"inputs":[{"internalType":"string","name":"_userName","type":"string"},{"internalType":"string","name":"_aadhaarNumber","type":"string"},{"internalType":"string","name":"_creationName","type":"string"},{"internalType":"string","name":"_creationDetails","type":"string"}],"name":"addCreation","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"creations","outputs":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"aadhaarNumber","type":"string"},{"internalType":"string","name":"creationName","type":"string"},{"internalType":"string","name":"creationDetails","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_creationId","type":"uint256"}],"name":"getCreation","outputs":[{"internalType":"string","name":"userName","type":"string"},{"internalType":"string","name":"aadhaarNumber","type":"string"},{"internalType":"string","name":"creationName","type":"string"},{"internalType":"string","name":"creationDetails","type":"string"},{"internalType":"uint256","name":"timestamp","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getCreationsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')

contract_address = '0x83873af7089cAD124f8Aa29D7680175c0Fce9dD7'  # Replace with your contract address

# Instantiate the contract
contract = web3.eth.contract(address=contract_address, abi=abi)


@app.route('/')
def index():
    return render_template('IP.html')


@app.route('/add-creation', methods=["GET","POST"])
def add_creation():
    userName = request.form['userName']
    aadhaarNumber = request.form['aadhaarNumber']
    creationName = request.form['creationName']
    creationDetails = request.form['creationDetails']
    account_address = '0x2d95b2a54e7Ee4eeC5D01773d05022E68b48fAa4'

    # Call the contract method to add creation
    tx_hash = contract.functions.addCreation(userName, aadhaarNumber, creationName, creationDetails).transact({'from': account_address})

    return 'Creation added successfully! Transaction hash: ' + tx_hash.hex()


if __name__ == '__main__':
    app.run(debug=True)
