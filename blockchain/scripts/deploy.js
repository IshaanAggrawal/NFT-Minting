const hre = require("hardhat");

async function main() {
  // Get the current timestamp and add 1 hour
  const unlockTime = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour from now

  console.log("Deploying Lock contract with unlock time:", new Date(unlockTime * 1000).toLocaleString());

  // Deploy the Lock contract with ETH value
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy(unlockTime, {
    value: hre.ethers.parseEther("1.0"), // Send 1 ETH to the contract
  });

  await lock.waitForDeployment();
  const address = await lock.getAddress();

  console.log("Lock Contract deployed to:", address);
  console.log("Unlock time:", unlockTime);
  console.log("Owner:", await lock.owner());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});