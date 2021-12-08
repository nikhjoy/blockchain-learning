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
        new Block(0, "01/01/2021", "This is the genesis block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

    let block1 = new Block(1, "02/01/2018",{mybalance = 100});
    let block2 = new Block(2, "03/01/2018",{mybalance = 50});
    

