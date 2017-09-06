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
//get the balance of coinbase address
let balance = web3.eth.getBalance(coinBase);
//convert balance to ether
let ether=web3.fromWei(balance,'ether');
console.log("Balance");
console.log("String=> "+ether.toString());
console.log("Array=> "+ether.c);
//Unlocking an account for may be transaction purpose
web3.personal.unlockAccount(web3.eth.accounts[0], "123", 3600, function(err, success) {
    if(success)
    {
        //Sending transaction
        web3.eth.sendTransaction({from:coinBase,to:web3.eth.accounts[1],value:2},(err,address)=>{
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
