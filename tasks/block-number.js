const { task } = require("hardhat/config")

task("block-number", "Prints the current block number").setAction(
    // functions can be assigned different ways. For example:
    // const blockTask = async function() => {}
    // async function blockTask() {}
    // function below is the same, it just doesnt have name(blockTask). This is known as anonymous function
    async (taskArgs, hre) => {
        // "hre" is Hardhat runtime enviroment; it is bassicly the same as ... require("hardhat") in deploy.js
        // hre can access different packages then hardhat
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
)

module.exports = {}
