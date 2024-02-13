// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // deploy library
  const StringComparer = await hre.ethers.getContractFactory("StringComparer");
  const stringComparer = await StringComparer.deploy();
  await stringComparer.waitForDeployment();
  console.log("StringComparer deployed to:", stringComparer.target);

  // Deploy Cow contract
  const Cow = await hre.ethers.getContractFactory("Cow", {
    libraries: {
      StringComparer: stringComparer.target,
    },
  });
  const cow = await Cow.deploy("Black Cow");
  await cow.waitForDeployment();
  console.log("Cow deployed to:", cow.target);

  // Deploy Horse contract
  const Horse = await hre.ethers.getContractFactory("Horse", {
    libraries: {
      StringComparer: stringComparer.target,
    },
  });
  const horse = await Horse.deploy("White Horse");
  await horse.waitForDeployment();
  console.log("Horse deployed to:", horse.target);

  // Deploy Wolf
  const Wolf = await hre.ethers.getContractFactory("Wolf", {
    libraries: {
      StringComparer: stringComparer.target,
    },
  });
  const wolf = await Wolf.deploy("Grey Wolf");
  await wolf.waitForDeployment();
  console.log("Wolf deployed to:", wolf.target);

  // Deploy Farmer contract
  const Farmer = await hre.ethers.getContractFactory("Farmer");
  const farmer = await Farmer.deploy();
  await farmer.waitForDeployment();
  console.log("Farmer deployed to:", farmer.target);

  // Farmer call
  const cowCalling = await farmer.call(cow.target);
  console.log("Cow answers: ", cowCalling);

  const horseCalling = await farmer.call(horse.target);
  console.log("Horse answers: ", horseCalling);

  // Farmer feed
  const feedPlant = await farmer.feed(wolf.target, "plant");
  console.log("Wolf eats plant? - ", feedPlant);

  const feedMeat = await farmer.feed(wolf.target, "meat");
  console.log("Wolf eats meat? - ", feedMeat);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
