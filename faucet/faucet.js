/**
 * Created by rashid on 9/6/17.
 */
const Web3 = require("web3");
let web3;
if (typeof web3 !== 'undefined') {
    // Don't lose an existing provider, like Mist or Metamask
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
web3.eth.getCoinbase(function(err, coinbase) {
    if (err) {
        console.error(err);
    } else {
        console.log("Coinbase: " + coinbase);
    }
});

// Your deployed address changes every time you deploy.
let faucetAddress = "0xee0c1f2ddbe140ffd8eeaf917bdc97e23e0366b4"; // <-- Put your own
let faucetContractFactory = web3.eth.contract(JSON.parse(faucetCompiled.contracts["Faucet.sol:Faucet"].abi));
let faucetInstance = faucetContractFactory.at(faucetAddress);

// Query eth for balance
web3.eth.getBalance(faucetAddress, function(err, balance) {
    if (err) {
        console.error(err);
    } else {
        console.log("Contract balance: " + balance);
    }
});

// Query the contract directly
faucetInstance.getBalance.call(function(err, balance) {
    if (err) {
        console.error(err);
    } else {
        console.log("Faucet balance: " + balance);
    }
});

function topUp() {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
            web3.eth.sendTransaction({
                from: coinbase,
                to: faucetAddress,
                value: web3.toWei(1, "ether")
            }, function(err, txn) {
                if (err) {
                    console.error(err);
                } else {
                    console.log("topUp txn: " + txn);
                }
            });
        }
    });
}


function sendWei() {
    web3.eth.getCoinbase(function(err, coinbase) {
        if (err) {
            console.error(err);
        } else {
            web3.eth.getAccounts(function(err, accounts) {
                if (err) {
                    console.error(err);
                } else {
                    var targetAccount = accounts[1];
                    faucetInstance.sendWei(
                        targetAccount,
                        { from: coinbase },
                        function(err, txn) {
                            if (err) {
                                console.error(err);
                            } else {
                                console.log("sendWei txn: " + txn);
                            }
                        });
                }
            });
        }
    });
}