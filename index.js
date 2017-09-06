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
const dataToSend = web3.toHex("I am sending transaction");
const FaucetData = "0x60606040525b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550670de0b6b3a76400006001819055505b5b61033d806100656000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806312065fe01461007a578063148f2e5e146100a35780633ba15036146100dc5780638da5cb5b146100f157806390b08a5214610146578063b603cd801461016f575b5b5b005b341561008557600080fd5b61008d61019c565b6040518082815260200191505060405180910390f35b34156100ae57600080fd5b6100da600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101bc565b005b34156100e757600080fd5b6100ef610202565b005b34156100fc57600080fd5b610104610247565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561015157600080fd5b61015961026c565b6040518082815260200191505060405180910390f35b341561017a57600080fd5b610182610277565b604051808215151515815260200191505060405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff163190505b90565b8073ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051600060405180830381858888f1935050505015156101fe57600080fd5b5b50565b3373ffffffffffffffffffffffffffffffffffffffff166108fc6001549081150290604051600060405180830381858888f19350505050151561024457600080fd5b5b565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600060015490505b90565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156102d457600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b905600a165627a7a723058200f1300b9ebface95378de8ec2cb498367c2bf3c067cebfc731d77cf0e2d98e230029";

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
function sendEther(from,password,to,value,data,gas) {
    web3.personal.unlockAccount(from, password, 3600, function (err, success) {
        if (success) {
            //Value to be send should be in Wei format
            const etherToSend = web3.toWei(value);
            //Sending transaction
            const transactionObject={
                from: from,
                value: etherToSend
            };
            if(to){
                transactionObject["to"]=to;
            }
            if(data){
                transactionObject["data"]=data;
            }
            if(gas){
                transactionObject["gas"]=gas;
            }
            web3.eth.sendTransaction(transactionObject, (err, address) => {
                if (err) {
                    throw err;
                }
                console.log("Address: " + address);
            });
        }
        else {
            throw err;
        }
    });
}

web3.eth.getTransaction("0xce5b30b8ee8791ed1761b10c4c86dec00a501324e240b1c8869679cc57b283cf",(err,data)=>{
    //console.log(data)
});

web3.eth.getTransactionReceipt("0xce5b30b8ee8791ed1761b10c4c86dec00a501324e240b1c8869679cc57b283cf",(err,data)=>{
    console.log(data)
})
//sendEther(coinBase,"123",null,1,FaucetData,1000000);