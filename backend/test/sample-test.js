const { expect } = require("chai");
const { ethers } = require("hardhat");

async function mineNBlocks(n) {
  for (let index = 0; index < n; index++) {
    await ethers.provider.send('evm_mine');
  }
}

describe("malevolent nft ",  function ()  {

  
  let NFT
  let nFT
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
    
    NFT = await ethers.getContractFactory("NFT")
    nFT =await NFT.deploy(nFTCrowdsale.address)
    await nFT.deployed() 
    
    Auction = await ethers.getContractFactory("Auction")
    auction =await Auction.deploy()
    await auction.deployed() 


    await nFTCrowdsale.setNFTaddress(nFT.address)
    await auction.setNFTaddress(nFT.address)
    await nFT.setAuctionAddress(auction.address)
    await auction.setPaymentaddress(_.address)
    
   
  });
 
  it("Should buy", async function () {
    
    let _value = await ethers.utils.parseEther('0.1')
    await nFTCrowdsale.startSale([_.address,per1.address],per3.address)

    await nFTCrowdsale.buyNFT(1,{value : _value})
   // await nFTCrowdsale.buyNFT(1,{value : _value})
    
   // await nFTCrowdsale.buyNFT(1,{value : _value})
    await nFTCrowdsale.buyNFT(2,{value : _value})
 //   await nFTCrowdsale.buyNFT(2,{value : _value})
    //await nFTCrowdsale.buyNFT(2,{value : _value})
    await mineNBlocks(6647)
     _value = await ethers.utils.parseEther('0.2')
    await nFTCrowdsale.buyNFT(1,{value : _value})
    await nFTCrowdsale.buyNFT(2,{value : _value})
    // await nFTCrowdsale.buyNFT(2,{value : _value})

    let owner =await nFT.ownerOf(5)
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
    
    let owner =await nFT.ownerOf(5)
    console.log(owner , per1.address)
    console.log("Account balance:", (await _.getBalance()).toString());
    
  });
// //   it("Should stake zpad", async function () {
// //     let _value = await ethers.utils.parseEther('45000')
// //     let approve = await zpad.approve(staking.address,_value)
// //     await approve.wait()
// //     let tx = await staking.stake(_value)
// //     await tx.wait()
// //     await mineNBlocks(10);
// //   });
// //   it("states", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.getUserStakedValue(_.address)
// //     console.log("staked value :",tx.toString())
// //     tx = await staking.TotalBronze()
// //     console.log("bronze value :",tx.toString())
// //     tx = await staking.totalSilver()
// //     console.log("silver value :",tx.toString())
// //     tx = await staking.totalGold()
// //     console.log("Gold value :",tx.toString())
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("1 PendingRewards :",tx.toString())
// //     tx = await staking.calcPendingRewards(per1.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //   });

// //   it("Should stake zpad", async function () {
// //     let _value = await ethers.utils.parseEther('95000')
// //     let approve = await zpad.approve(staking.address,_value)
// //     await approve.wait()
// //     let tx = await staking.stake(_value)
// //     await tx.wait()
// //     await mineNBlocks(10);

// //   });

// //   it("states", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.getUserStakedValue(_.address)
// //     console.log("staked value :",tx.toString())
// //     tx = await staking.TotalBronze()
// //     console.log("bronze value :",tx.toString())
// //     tx = await staking.totalSilver()
// //     console.log("silver value :",tx.toString())
// //     tx = await staking.totalGold()
// //     console.log("Gold value :",tx.toString())
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("1 PendingRewards :",tx.toString())
// //     tx = await staking.calcPendingRewards(per1.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //   });
// //   it("Should unstake zpad", async function () {
// //     let _value = await ethers.utils.parseEther('200')
    
// //     let tx = await staking.connect(per1).unStake(_value)
// //     await tx.wait()

// //   });
// //   it("states", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.getUserStakedValue(_.address)
// //     console.log("staked value :",tx.toString())
// //     tx = await staking.TotalBronze()
// //     console.log("bronze value :",tx.toString())
// //     tx = await staking.totalSilver()
// //     console.log("silver value :",tx.toString())
// //     tx = await staking.totalGold()
// //     console.log("Gold value :",tx.toString())
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("1 PendingRewards :",tx.toString())
// //     tx = await staking.calcPendingRewards(per1.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //   });

// //   it("Should withdraw rewards", async function () {
    
// //     let _value = await ethers.utils.parseEther('30000')
// //     let tx = await staking.withdrawRewards()
// //     await tx.wait()
// //     tx = await staking.calcPendingRewards(_.address)
// //     console.log("2 PendingRewards :",tx.toString())
// //     tx = await rewardToken.balanceOf(_.address)
// //     console.log("Balance Of rewardtoken :",tx.toString())
    
// //   });

// //   it("Should create project IDO", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let approve = await tokenForSale.approve(factory.address,100000);
// //     await approve.wait()
// //     let tx = await factory.create_TokenSale(tokenForSale.address,_.address,1000000000000,100,_.address)
// //     await tx.wait()  
// //   });

// //   it("Should create ico & whitelist", async function () {
// //     let _value = await ethers.utils.parseEther('30000')
// //     let approve = await tokenForSale.approve(factory.address,100000);
// //     await approve.wait()
// //     let ico = await factory.ico_addr()
    
// //     crowdSale = await CrowdSale.attach(ico)
// //     let whitelist = await crowdSale.connect(per1).getWhitlisted()
// //     await whitelist.wait()
    
// //     let userIdos = await ticketConsumer.getUserAppliedProjects(_.address)
// //     console.log("user idos",userIdos)

// //     userIdos = await ticketConsumer.getUserAppliedProjects(per1.address)
     
// //     console.log("user idos",typeof(userIdos))
// //   });
  

});
