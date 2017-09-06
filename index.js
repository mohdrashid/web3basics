/**
 * Created by rashid on 9/6/17.
 */
const Web3 = require("web3");
let web3;
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
//Get Coinbase address
let coinBase = web3.eth.coinbase;
//Number of transactions of this account
let number = web3.eth.getTransactionCount(coinBase);
console.log("Number of contracts: "+number);
//get the balance of coinbase address
let balance = web3.eth.getBalance(coinBase);
//convert balance to ether
let ether=web3.fromWei(balance,'ether');
console.log("Balance as String=> "+ether.toString());
console.log("Balance as Array=> "+ether.c);
//Unlocking an account for may be transaction purpose
web3.personal.unlockAccount(web3.eth.accounts[0], "123", 3600, function(err, success) {
    if(success)
    {
        //Value to be send should be in Wei format
        const etherToSend=web3.toWei(1);
        //Data should be in Hex format
        const dataToSend=web3.toHex("I am sending transaction");
        //Sending transaction
        web3.eth.sendTransaction(
            {
                from:coinBase,
                to:web3.eth.accounts[1],
                value:etherToSend,
                data:dataToSend
            },(err,address)=>{
                if(err){
                    throw err;
                }
                console.log("Address: "+address);
            });
    }
    else{
        throw err;
    }
});

web3.eth.getTransactionReceipt("0x8966c296fff1eea6ad7d9c4949f88b686575fd8e812ce99a9c6b9a05e2613425",(err,data)=>{
    console.log(data)
});

