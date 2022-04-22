import React, { useState } from 'react'
import { nFTCrowdsale_addr, auction_addr, nFT1_addr, nFT2_addr } from "../contract/addresses";
import { ethers, BigNumber } from 'ethers';
import Web3Modal from 'web3modal';
import { useWeb3React } from "@web3-react/core";
import NFTCrowdsaleAbi from "../contract/NFTCrowdsale.json"
import AuctioneAbi from "../contract/Auction.json"

const MyNfts = () => {

    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal
    } = useWeb3React();

    const [addr, serAddr] = useState()
    const [id, setId] = useState()

    const loadProvider = async () => {
        try {
            const web3Modal = new Web3Modal();
            const connection = await web3Modal.connect();
            const provider = new ethers.providers.Web3Provider(connection);
            return provider.getSigner();
        } catch (e) {
            console.log("loadProvider default: ", e);
        }
    };



    const buyNft = async () => {
        try {
            let _value = await ethers.utils.parseEther('0.2')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFTCrowdsale_addr, NFTCrowdsaleAbi, signer)
            console.log(NFTCrowdsaleContract)
            let buyNft = await NFTCrowdsaleContract.buyNFT(1, { value: _value })
            let tx = await buyNft.wait()
            console.log("tx", tx)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }


    const buyNft2 = async () => {
        try {
            let _value = await ethers.utils.parseEther('0.2')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFTCrowdsale_addr, NFTCrowdsaleAbi, signer)
            console.log(NFTCrowdsaleContract)
            let buyNft = await NFTCrowdsaleContract.buyNFT(2, { value: _value })
            let tx = await buyNft.wait()
            console.log("tx", tx)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }

    const auction = async () => {
        try {
            // let _value = await ethers.utils.parseEther('0.1')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFTCrowdsale_addr, NFTCrowdsaleAbi, signer)
            console.log(NFTCrowdsaleContract)
            let tx = await NFTCrowdsaleContract.auction()
            serAddr(tx)
            // let tx = await buyNft.wait()
            console.log("buyNft", tx)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }

    const setAuctionAddress = async () => {
        try {
            // let _value = await ethers.utils.parseEther('0.1')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFTCrowdsale_addr, NFTCrowdsaleAbi, signer)
            console.log(NFTCrowdsaleContract)
            let setAuctionAddress = await NFTCrowdsaleContract.setAuctionAddress(auction_addr)
            let tx = await setAuctionAddress.wait()
            console.log("tx", tx)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }

    const setNFTaddress = async () => {
        try {
            // let _value = await ethers.utils.parseEther('0.1')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(auction_addr, AuctioneAbi, signer)
            console.log(NFTCrowdsaleContract)
            let startAuction = await NFTCrowdsaleContract.setNFTaddress(nFT2_addr)
            let tx = await startAuction.wait()
            console.log("tx", tx)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }

    const startAuction = async () => {
        try {
            let _value = await ethers.utils.parseEther('0.5')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(auction_addr, AuctioneAbi, signer)
            console.log(NFTCrowdsaleContract)
            let startAuction = await NFTCrowdsaleContract.startAuction(_value, 1)
            let tx = await startAuction.wait()
            console.log("tx", tx)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }







    const Bid = async () => {
        try {
            // let _value = await ethers.utils.parseEther('0.1')
            let _value = await ethers.utils.parseEther('0.7')
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(auction_addr, AuctioneAbi, signer)
            console.log(NFTCrowdsaleContract)
            let startAuction = await NFTCrowdsaleContract.bid({ value: _value })
            // let tx = await startAuction.wait()
            console.log("startAuction", startAuction)
        }
        catch (e) {
            console.log("error: ", e)
        }
    }



    const loadNFTs = async () => {
        try {
            
            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nft_addr, NFT, signer);
            let balanceOf = await NFTCrowdsaleContract.balanceOf(account)
            let balance = balanceOf.toNumber()
            let arr= [] 
            let counter = 0
            for(var i = 0; i < balanceOf; i++) {
              let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(account,i);
                // console.log("all indexes",id.toString());
                let tokenType = await NFTCrowdsaleContract.tokenType(id)
                let token = tokenType.toNumber()
                // console.log("tokenType", token)
                arr.push(token)
                // console.log("arr", arr)
                if(token == 0) {
                    counter += 1
                    setCount(counter)
                }
                else{
                    console.log("sorry")
                }
                
                
            }
           
            // console.log("balanceOf", balance)
           
            // console.log("signer", signer)

        } catch (e) {
            console.log("data", e)
        }
    }





    return (
        <div style={{ textAlign: "center" }}>
            <button onClick={buyNft} style={{ margin: "10rem auto" }}>
                fallen
            </button>
            <button onClick={buyNft2} style={{ margin: "10rem auto" }}>
                guardian
            </button>
            <button onClick={setNFTaddress} style={{ margin: "10rem auto" }}>
                setNFTaddress
            </button>
            <button onClick={startAuction} style={{ margin: "10rem auto" }}>
                startAuction
            </button>
            <button onClick={Bid} style={{ margin: "10rem auto" }}>
                Bid
            </button>

            <div>
                <input type="text" placeholder='Enter id to get Nft' onChange={(e) => setId(e.target.value)} />
            </div>
            <div style={{ marginTop: "20px" }}>
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }}>Sumbit</button>
            </div>

        </div>
    )
}

export default MyNfts