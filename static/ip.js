// Connect to Ethereum network
const web3 = new Web3(Web3.givenProvider);

// Contract ABI (interface)
const abi = [[
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
]];
const contractAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B'; // Replace with your contract address

// Instantiate the contract
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to add creation
document.getElementById('creationForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const userName = formData.get('userName');
    const aadhaarNumber = formData.get('aadhaarNumber');
    const creationName = formData.get('creationName');
    const creationDetails = formData.get('creationDetails');

    const accounts = await web3.eth.getAccounts();

    // Call the contract method to add creation
    await contract.methods.addCreation(userName, aadhaarNumber, creationName, creationDetails).send({ from: accounts[0] });

    alert('Creation added successfully!');
});
