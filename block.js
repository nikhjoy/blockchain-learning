const SHA256 = require("crypto-js/sha256");

class Block {
    constructor (index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        //SHA256 cryptographic function to generate the hash of the block
        return SHA256(this.index+this.timestamp+this.previousHash+JSON.stringify(this.data)).toString();
    }

}

class Blockchain{
    constructor(){
        //the first variable of the array will be the genesis block, created manally
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
       return new Block(0, "01/01/2021", "This is the genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    checkBlockChainValid(){
        for (let i=1; i<this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

}

//creating 2 new blocks
let block1 = new Block(1, "02/01/2018",{mybalance : 100});
let block2 = new Block(2, "03/01/2018",{mybalance : 50});

//create a new block chain
let myBlockchain = new Blockchain();

//adding the new blocks to the blovk chain
myBlockchain.addBlock(block1);
myBlockchain.addBlock(block2);

console.log(JSON.stringify(myBlockchain,null,4));
console.log("Validation check for the Block Chain before hacking:" +myBlockchain.checkBlockChainValid());

myBlockchain.chain[2].data = {mybalance : 500};
console.log(JSON.stringify(myBlockchain,null,4));
console.log("Validation check for the Block Chain after hacking:" +myBlockchain.checkBlockChainValid());
