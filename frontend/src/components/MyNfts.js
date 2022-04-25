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
    
    const [addr, serAddr] = useState()
    const [addr2, setAddr2] = useState()
    const [user_address, setUser_address] = useState()
    const [token_ID, setToken_ID] = useState()
    const [nft_1, setNft_1] = useState()
    const [nft_2, setNft_2] = useState()
    const [count, setCount] = useState()
    const [iswhitelist, setiswhitelist] = useState(false);
    const [uri, setUri] = useState([])
    const [nft1, setNft1] = useState([])
    const [nft2, setNft2] = useState([])
    const [loaded, setLoaded] = useState(false)

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

            let user_account = ethers.utils.getAddress(user_address.toString())
            
            let balanceOf = await NFTCrowdsaleContract.balanceOf(user_address)
            
            let balance = balanceOf.toNumber()
            console.log("balance", balance)
            let arr = []
            let counter = 0
            for (var i = 0; i < balanceOf; i++) {
                let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(user_account, i);
                id = id.toString()
                let tokenURI = await NFTCrowdsaleContract.tokenURI(id)
                console.log("tokenURI", {id , tokenURI})
                arr.push({id , tokenURI})
            }
            let details = []
            arr.forEach(i => {
                 const response = axios.get(i.tokenURI)
                .then(function (response) {
                   details.push({id : i.id , data : response.data})
                    console.log("response",{id : i.id , data : response.data},i);
                   setNft1([...details])
                })
            });
            
        } catch (e) {
            console.log("data", e)
        }
    }


    const loadOneNFT1 = async () => {
        try {

            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFT1_addr, FallenAbi, signer);

            //let user_account = ethers.utils.getAddress(user_address.toString())
            
            //let balanceOf = await NFTCrowdsaleContract.balanceOf(user_address)
            let ownerOf = await NFTCrowdsaleContract.ownerOf(token_ID)
            console.log(ownerOf)
            // let balance = balanceOf.toNumber()
            
            let counter = 0
            let tokenURI = await NFTCrowdsaleContract.tokenURI(token_ID)
            
            
            let details 
            let id = token_ID
                 const response = axios.get(tokenURI)
                .then(function (response) {
                   details ={id : id , owner : ownerOf , data : response.data}
                    setNft_1(details)
                })
          
            
        } catch (e) {
            console.log("data", e)
        }
    }

    const loadOneNFT2 = async () => {
        try {

            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFT2_addr, GuardianAbi, signer);

            //let user_account = ethers.utils.getAddress(user_address.toString())
            
            //let balanceOf = await NFTCrowdsaleContract.balanceOf(user_address)
            let ownerOf = await NFTCrowdsaleContract.ownerOf(token_ID)
            console.log(ownerOf)
            // let balance = balanceOf.toNumber()
            
            let counter = 0
            let tokenURI = await NFTCrowdsaleContract.tokenURI(token_ID)
            
            
            let details 
            let id = token_ID
                 const response = axios.get(tokenURI)
                .then(function (response) {
                   details ={id : id , owner : ownerOf , data : response.data}
                    setNft_2(details)
                })
          
            
        } catch (e) {
            console.log("data", e)
        }
    }


   


    const loadNFTs2 = async () => {
        try {

            let signer = await loadProvider()
            let NFTCrowdsaleContract = new ethers.Contract(nFT2_addr, GuardianAbi, signer);
            let user_account = ethers.utils.getAddress(user_address.toString())
            
            let balanceOf = await NFTCrowdsaleContract.balanceOf(user_address)
            
            let balance = balanceOf.toNumber()
            console.log("balance", balance)
            let arr = []
            let counter = 0
            for (var i = 0; i < balanceOf; i++) {
                let id = await NFTCrowdsaleContract.tokenOfOwnerByIndex(user_account, i);
                id = id.toString()
                let tokenURI = await NFTCrowdsaleContract.tokenURI(id)
                console.log("tokenURI", {id , tokenURI})
                arr.push({id , tokenURI})
            }
            let details = []
            arr.forEach(i => {
                 const response = axios.get(i.tokenURI)
                .then(function (response) {
                   details.push({id : i.id , data : response.data})
                    console.log("response",{id : i.id , data : response.data},i);
                   setNft2([...details])
                })
            });

        } catch (e) {
            console.log("data", e)
        }
    }


    






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
                <input type="text" placeholder='Enter id to get Nft' value={token_ID} onChange={(e) => setToken_ID(e.target.value)} />
            </div>
            <div style={{ marginTop: "20px" }}>
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }} onClick={loadOneNFT1}>Fallen one</button>
            </div>
            <div style={{ marginTop: "20px" }}>
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }} onClick={loadOneNFT2}>Guardian one</button>
            </div>
            <div>
                <p>owner : {nft_1 !== undefined ? nft_1.owner : "null"}</p>
                <p>Token ID : {nft_1 !== undefined ? nft_1.id : "null"}</p>
                <img src={nft_1 !== undefined ? nft_1.data.image : null} />
                
            
            </div>
            <div>
                <p>owner : {nft_2 !== undefined ? nft_2.owner : "null"}</p>
                <p>Token ID : {nft_2 !== undefined ? nft_2.id : "null"}</p> 
                <img src={nft_2 !== undefined ? nft_2.data.image : null} />
                
            
            </div>
            <div>
                <input type="text" placeholder='Enter address to get Nft' value={user_address} onChange={(e) => setUser_address(e.target.value)} />
            </div>
            <div style={{ marginTop: "20px" }}>
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }} onClick={loadNFTs}>Fallen</button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <button style={{ padding: "8px 20px 8px 20px", backgroundColor: "lightblue", borderRadius: "20px" }} onClick={loadNFTs2}>Guardian</button>
            </div>

            <div>
            {nft1 !== undefined && nft1 !== null ? nft1.map((arr, i) => {
                 console.log("arr>>>", arr.id)
                return(
                    <div key={i}>
                        {console.log("arr>>>", arr.data.name)}
                        <p>Token ID : { arr.id }</p>
                       <p>name : { arr.data.name }</p>
                       <img src={arr.data.image} />
                       <p>description : {arr.data.description}</p>
                    </div>
                )
               
                
            }) : "null"}
            </div>
            <div>
            {nft2 !== undefined && nft2 !== null ? nft2.map((arr, i) => {
                 console.log("arr>>>", arr.id)
                return(
                    <div key={i}>
                        {console.log("arr>>>", arr.data.name)}
                        <p>Token ID : { arr.id }</p>
                       <p>name : { arr.data.name }</p>
                       <img src={arr.data.image} />
                       <p>description : {arr.data.description}</p>
                    </div>
                )
               
                
            }) : "null"}
            </div>
            

        </div>
    )
}

export default MyNfts