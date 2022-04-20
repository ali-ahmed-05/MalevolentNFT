// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const { json } = require("hardhat/internal/core/params/argumentTypes");

// This is a script for deploying your contracts. You can adapt it to deploy
// yours, or create new ones.

async function main() {
  // This is just a convenience check
  // if (network.name === "hardhat") {
  //   console.warn(
  //     "You are trying to deploy a contract to the Hardhat Network, which" +
  //       "gets automatically created and destroyed every time. Use the Hardhat" +
  //       " option '--network localhost'"
  //   );
  // }

  // ethers is avaialble in the global scope
  const [deployer,per1,per2] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // zpad deploy // use zpad address
  // ZPad = await ethers.getContractFactory("ZPad");
  // zpad = await ZPad.deploy();
  // await zpad.deployed();



    NFTCrowdsale = await ethers.getContractFactory("NFTCrowdsale")
    nFTCrowdsale =await NFTCrowdsale.deploy()
    await nFTCrowdsale.deployed()  
    
    NFT1 = await ethers.getContractFactory("FallenNFT")
    nFT1 =await NFT1.deploy(nFTCrowdsale.address)
    await nFT1.deployed() 

    NFT2 = await ethers.getContractFactory("GuardianNFT")
    nFT2 =await NFT2.deploy(nFTCrowdsale.address)
    await nFT2.deployed() 
    
    Auction = await ethers.getContractFactory("Auction")
    auction =await Auction.deploy()
    await auction.deployed() 


    await nFTCrowdsale.setAngelNFTaddress(nFT1.address)
    await nFTCrowdsale.setGuardNFTaddress(nFT2.address)
    await nFTCrowdsale.setAuctionAddress(auction.address)
    await auction.setNFTaddress(nFT2.address)
    await auction.setPaymentaddress(_.address)
  // use zpad address

  console.log("nFTsale deployed to:", nFTCrowdsale.address);
  console.log("nFTsale deployed to:", nFT1.address);
  console.log("nFTsale deployed to:", nFT2.address);
  console.log("nFTsale deployed to:", auction.address);
  // let i
  // for(i = 1 ; i<36 ; i++){       
  //   let approve = await nFT.createToken("0xa337275a57f9ad3cB17a761559c29fF990A7bf1F",i)
  //   await approve.wait()
  // }

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(nFTCrowdsale,nFT1,nFT2,auction);
}
//,nftPreSale,nftPubSale,nft

function saveFrontendFiles(nFTCrowdsale,nFT1,nFT2,auction) {
  const fs = require("fs");
  const contractsDir = "../frontend/src/contract";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

let config = `
 "export const nFTCrowdsale_addr = "${nFTCrowdsale.address}"
 "export const nFT1_addr = "${nFT1.address}"
 "export const nFT2_addr = "${nFT2.address}"
 "export const auction_addr = "${auction.address}"
`

  let data = JSON.stringify(config)
  fs.writeFileSync(
    contractsDir + '/addresses.js', JSON.parse(data)

  );

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


// npx hardhat run scripts\deploy.js --network rinkeby