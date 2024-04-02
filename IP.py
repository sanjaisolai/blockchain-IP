from flask import Flask, render_template, request
#from web3 import Web3, HTTPProvider
import json

app = Flask(__name__)



@app.route('/')
def index():
    return render_template('getcreation.html')


# @app.route('/add-creation', methods=["GET","POST"])
# def add_creation():
#     userName = request.form['userName']
#     aadhaarNumber = request.form['aadhaarNumber']
#     creationName = request.form['creationName']
#     creationDetails = request.form['creationDetails']
#     account_address = '0x2d95b2a54e7Ee4eeC5D01773d05022E68b48fAa4'

#     # Call the contract method to add creation
#     tx_hash = contract.functions.addCreation(userName, aadhaarNumber, creationName, creationDetails).transact({'from': account_address})

#     return 'Creation added successfully! Transaction hash: ' + tx_hash.hex()


if __name__ == '__main__':
    app.run(debug=True)
