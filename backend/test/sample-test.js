const { expect } = require("chai");
const { ethers } = require("hardhat");

async function mineNBlocks(n) {
  for (let index = 0; index < n; index++) {
    await ethers.provider.send('evm_mine');
  }
}

describe("malevolent nft ",  function ()  {

  
  let NFT1
  let nFT1
  let NFT2
  let nFT2
  let NFTCrowdsale
  let nFTCrowdsale
  let Auction
  let auction



//   let [_,per1,per2,per3] = [1,1,1,1]

  it("Should deploy all smart contracts", async function () {

    [_,per1,per2,per3] = await ethers.getSigners()

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
    
   
  });
 
  it("Should buy", async function () {
    
    let _value = await ethers.utils.parseEther('0.1')
    await nFTCrowdsale.startSale([_.address,per1.address],per3.address)

    await nFTCrowdsale.buyNFT(1,{value : _value})
   // await nFTCrowdsale.buyNFT(1,{value : _value})
    
//    // await nFTCrowdsale.buyNFT(1,{value : _value})
    await nFTCrowdsale.buyNFT(2,{value : _value})
  // await nFTCrowdsale.buyNFT(2,{value : _value})
//     //await nFTCrowdsale.buyNFT(2,{value : _value})
    await mineNBlocks(6647)
    _value = await ethers.utils.parseEther('0.2')
    await nFTCrowdsale.buyNFT(1,{value : _value})
    await nFTCrowdsale.buyNFT(2,{value : _value})
    // await nFTCrowdsale.buyNFT(2,{value : _value})

    let owner =await nFT2.balanceOf(auction.address)
    console.log(owner , auction.address)

    owner =await nFT2.ownerOf(5)
    console.log(owner , auction.address)
    
   
  });
  it("start auction", async function () {
   let _value = await ethers.utils.parseEther('0.5')
    await auction.startAuction(_value, 1 )
   
    
    
  });
  it("Should bid", async function () {
    
    let _value = await ethers.utils.parseEther('0.5')
    await auction.bid({value : _value})
    _value = await ethers.utils.parseEther('1')
    await auction.connect(per2).bid({value : _value})
    _value = await ethers.utils.parseEther('10')
    await auction.connect(per2).bid({value : _value})
    _value = await ethers.utils.parseEther('20')
    await auction.connect(per1).bid({value : _value})
    _value = await ethers.utils.parseEther('100')
    await auction.connect(per1).bid({value : _value})
    await mineNBlocks(6647)
    
    // _value = await ethers.utils.parseEther('0.7')
    // await auction.connect(per1).bid({value : _value})

    
  });

  it("return bids", async function () {
       console.log("Account balance:", (await per2.getBalance()).toString());
       await auction.connect(per2).withdraw()
       
       console.log("Account balance:", (await per2.getBalance()).toString());
      });

  it("conclude", async function () {
    await mineNBlocks(6647)
    console.log("Account balance:", (await _.getBalance()).toString());
    await auction.concludeAuction()
    
    let owner =await nFT2.ownerOf(5)
    console.log(owner , per1.address)
    console.log("Account balance:", (await _.getBalance()).toString());
    
  });
  

});
