
const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners(); 

  console.log("Deploying contracts with the account: ", deployer.address); 

  const ContactFactory = await ethers.getContractFactory("ContactFactory");
  const contactFactory = await ContactFactory.deploy();

  await contactFactory.deployed();

  console.log("ContactFactory deployed to: ", contactFactory.address);
}

//address 0xE4Efc54cbFcDD8176EC8cdF1Dc0012346A1C458C

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
