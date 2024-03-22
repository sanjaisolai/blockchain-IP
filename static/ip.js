const { error } = require("console");
const { ethers } = require("ethers");
const { access } = require("fs");
async function connect(){
	if(typeof window.ethereum !== "undefined"){
		await window.ethereum.request({ method: "eth_requestAccounts"});
	}
}
async function execute(){

	const contract_address="0xd94e46ca97b7652989582dbbE2Dc8595E087fcfd";
	const abi=[
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "uint256",
					"name": "creationId",
					"type": "uint256"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "userName",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "aadhaarNumber",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "creationName",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "string",
					"name": "creationDetails",
					"type": "string"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"name": "CreationAdded",
			"type": "event"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "_userName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_aadhaarNumber",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_creationName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "_creationDetails",
					"type": "string"
				}
			],
			"name": "addCreation",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"name": "creations",
			"outputs": [
				{
					"internalType": "string",
					"name": "userName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "aadhaarNumber",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "creationName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "creationDetails",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_creationId",
					"type": "uint256"
				}
			],
			"name": "getCreation",
			"outputs": [
				{
					"internalType": "string",
					"name": "userName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "aadhaarNumber",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "creationName",
					"type": "string"
				},
				{
					"internalType": "string",
					"name": "creationDetails",
					"type": "string"
				},
				{
					"internalType": "uint256",
					"name": "timestamp",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getCreationsCount",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];
	
	
	const account= await window.ethereum.request({ method: "eth_requestAccounts"});
	const user_address=account[0];
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const userName = document.getElementById('userName').value;
    const aadhaarNumber = document.getElementById('aadhaarNumber').value;
    const creationName = document.getElementById('creationName').value;
    const creationDetails = document.getElementById('creationDetails').value;
	const signer = provider.getSigner();
	const contract = new ethers.Contract(contract_address, abi, signer);
	try {
		const tx = await contract.addCreation(userName, aadhaarNumber, creationName, creationDetails);
        const hash_1=tx.hash;
		console.log(hash_1);
		document.getElementById("user_address").value = user_address;
		document.getElementById("tx_hash").value=hash_1;
		const id=await contract.getCreationsCount();
		const creationCountElement = document.getElementById('creationid');
		creationCountElement.innerHTML=id;
		document.getElementById("id").value=id;
	} catch (error) {
		console.error("Transaction failed");
	}
	
	
	
}
connect();
document.getElementById('creationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    await execute(); // Call the execute function when the form is submitted
});

module.exports = { connect, execute };
