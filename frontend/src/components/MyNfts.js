import React, { useEffect, useState } from 'react';
import { nFTCrowdsale_addr, auction_addr, nFT1_addr, nFT2_addr } from "../contract/addresses";
import { ethers, BigNumber } from 'ethers';
import Web3Modal from 'web3modal';
import { useWeb3React } from "@web3-react/core";
import NFTCrowdsaleAbi from "../contract/NFTCrowdsale.json"
import AuctioneAbi from "../contract/Auction.json"
import FallenAbi from "../contract/FallenNFT.json"
import GuardianAbi from "../contract/GuardianNFT.json"
import { injectedConnector } from "../utils/connectors"
import { connectWallet } from "../utils/connectWallet";
const axios = require('axios');



const MyNfts = () => {

    const {
        connector,
        library,
        account,
        chainId,
        activate,
        deactivate,
        active,
        errorWeb3Modal,
        active: networkActive, error: networkError, activate: activateNetwork
    } = useWeb3React();
    
    useEffect(() => {
        injectedConnector
            .isAuthorized()
            .then((isAuthorized) => {
                setLoaded(true)
                if (isAuthorized && !networkActive && !networkError) {
                    activateNetwork(injectedConnector)
                }
            })
            .catch(() => {
                setLoaded(true)
            })
    }, [activateNetwork, networkActive, networkError])

    const [addr, serAddr] = useState()
    const [addr2, setAddr2] = useState()
    const [idd, setId] = useState()
    const [count, setCount] = useState()
    const [iswhitelist, setiswhitelist] = useState(false);
    const [uri, setUri] = useState([])
    const [nft1, setNft1] = useState()
    const [nft2, setNft2] = useState()
    const [loaded, setLoaded] = useState(false)


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
            let NFTCrowdsaleContract = new ethers.Contract(nFT1_addr, FallenAbi, signer);
            let balanceOf = await NFTCrowdsaleContract.balanceOf(account)
            let ownerOf = await NFTCrowdsaleContract.ownerOf(2)
            serAddr(ownerOf)
            console.log("accou", ownerOf)
            let balance = balanceOf.toNumber()
            console.log("balance", balance)
            let arr = []
            let counter = 0
            let id = await NFTCrowdsaleContract.tokenByIndex( idd);
                let tokenType = await NFTCrowdsaleContract.tokenURI(20)
                console.log("tokenType", idd)
                arr.push(tokenType)
            // for (var i = 0; i < balanceOf; i++) {
            //     let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(account, i);
            //     // console.log("all indexes",id.toString());
            //     let tokenType = await NFTCrowdsaleContract.tokenURI(id)
            //     //   let token = tokenType.toNumber()
            //     console.log("tokenType", id)
            //     arr.push(tokenType)
            //     // console.log("arr", arr)
            //     if (tokenType == 0) {
            //         counter += 1
            //         //   setCount(counter)
            //     }
            //     else {
            //         console.log("sorry")
            //     }


            // }


            const response = axios.get( arr[0])
                .then(function (response) {
                    // handle success
                    setNft1(response.data)
                    console.log(response);
                })


        } catch (e) {
            console.log("data", e)
        }
    }


   


    const loadNFTs2 = async () => {
        try {

            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFT2_addr, GuardianAbi, signer);
            let balanceOf = await NFTCrowdsaleContract.balanceOf(account)
            let balance = balanceOf.toNumber()
            let ownerOf = await NFTCrowdsaleContract.ownerOf(3)
            setAddr2(ownerOf)

            // let accou = await NFTCrowdsaleAbi.ownerOf(idd)
            // console.log("accou", accou)
            console.log("balance", balance)

            let arr = []
            let counter = 0
            let id = await NFTCrowdsaleContract.tokenByIndex( idd);
                let tokenType = await NFTCrowdsaleContract.tokenURI(20)
                console.log("tokenType", id)
                arr.push(tokenType)
            // for (var i = 0; i < balanceOf; i++) {
            //     let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(account, i);
            //     // console.log("all indexes",id.toString());
            //     let tokenType = await NFTCrowdsaleContract.tokenURI(id)
            //     //   let token = tokenType.toNumber()
            //     // console.log("tokenType", token)
            //     arr.push(tokenType)
            //     // console.log("arr", arr)
            //     if (tokenType == 0) {
            //         counter += 1
            //         //   setCount(counter)
            //     }
            //     else {
            //         console.log("sorry")
            //     }

                


            // }

            const response = axios.get( arr[0])
                .then(function (response) {
                    // handle success
                    setNft2(response.data)
                    // console.log("response",response);
                })


            // console.log("balanceOf", balance)

            // console.log("signer", signer)

        } catch (e) {
            console.log("data", e)
        }
    }


    // useEffect(() => {
    //     (async () => {
    //         if (account) {
    //             try {
    //                 loadNFTs()
    //                 loadNFTs2()
    //             } catch (error) {
    //                 console.log("error")
    //             }
    //         }
    //     })()
    // }, [account, idd]);
    // loadNFTs2()







    return (
        <div style={{ textAlign: "center" }}>

                                {active
                                ? (
                                    <button className="btn btn-primary btn-wallet p-2 mb-0 mb-md-3">CONNECTED</button>
                                ) :<button onClick={(e) => {
                                    connectWallet(activate, "Error");
                                    e.preventDefault()
                                }} className="btn btn-primary btn-wallet p-2 mb-0 mb-md-3">CONNECT YOUR WALLET</button>
                            }

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
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }} onClick={loadNFTs}>Fallen</button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }} onClick={loadNFTs2}>Guardian</button>
            </div>

            <div>
            {nft1 !== undefined ? nft1.name : "null"}
            <img src={nft1 !== undefined ? nft1.image : null} />
            {nft1 !== undefined ? nft1.description : null}
            <div>
            {addr}
            </div>
            </div>
            <div>
            {nft2 !== undefined ? nft2.name : "null"}
            <img src={nft2 !== undefined ? nft2.image : null} />
            {nft2 !== undefined ? nft2.description : null}
            <div>
            {addr2}
            </div>
            </div>

        </div>
    )
}

export default MyNfts