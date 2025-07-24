import { ethers } from "hardhat"; // Import ethers.js from the Hardhat framework

async function main() {
    // Retrieve the current network information from the ethers provider
    const network = await ethers.provider.getNetwork();

    // Log the name of the network where the contract is being deployed (e.g., "sepolia" or "mainnet")
    console.log(`Deploying to network: ${network.name}`);

    console.log("Deploying ERC20 contract...");

    // Define the initial supply of the ERC20 token in wei (1 million tokens)
    const initialSupply = ethers.utils.parseEther("1000000");
    
    // Get the contract factory for the ERC20 token
    const ERC20Token = await ethers.getContractFactory("ERC20Token");

    // Deploy the ERC20 token contract with the specified initial supply
    const token = await ERC20Token.deploy(initialSupply);

    // Wait for the deployment transaction to be mined
    await token.deployTransaction.wait();

    console.log(`Token deployed to: ${token.deployTransaction.hash}`);

}

// Main entry point for the deployment script
main().catch((error) => {
    // Handle any errors that occur during deployment
    console.error("Error in deployment:", error);
    process.exitCode = 1; // Set the process exit code to indicate failure
});