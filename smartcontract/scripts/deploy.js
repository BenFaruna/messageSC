// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const initialMessage = "This contract was just deployed";

  const message = await hre.ethers.deployContract("MyMessage", [initialMessage]);
  await message.waitForDeployment();

  fs.writeFileSync(path.join(__dirname, "..", "contract.js"), `contract_address = "${message.target}";`)
  console.log("Deployed to", message.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
