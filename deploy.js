const ethers = require("ethers");
const fs = require("fs-extra");

async function main() {
    const provider = new ethers.providers.JsonRpcProvider("http://172.31.208.1:7545");
    const wallet = new ethers.Wallet(
      "943e0a9b624e883e21cfdf68c54e87579637e922fc9a933782bb391b77f7cb3b", 
      provider);
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8"); 
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying please wait...");
    const contract = await contractFactory.deploy();
    await contract.deployTransaction.wait(1);
    // consolee.log(`Contract address: ${contract.address}`)
    // Get Number
    const currentFavouriteNumber = await contract.retrieve();
    console.log(`Current Favourite Number: ${currentFavouriteNumber.toString()}`);
    const transactionResponse = await contract.store("7");
    const transactionReceipt = await contract.deployTransaction.wait(1);

    // console.log(contract.deployTransaction);
    
    // console.log(contract);
    // console.log(transactionReceipt);

    const updatedFavouriteNumber = await contract.retrieve();
    console.log(`updated favourite number is: ${updatedFavouriteNumber}`); 
}



main() 
.then(() => process.exit(0))
.catch((error) => {
    console.log(error);
    process.exit(1);

})