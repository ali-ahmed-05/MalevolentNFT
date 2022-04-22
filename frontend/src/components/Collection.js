import React, {useEffect, useState} from "react";
import collection_heading from "../assets/images/Collection_heading.png";
import celestialAngels from "../assets/images/celestial-angels.png";
import collection from "../assets/images/collection.png";
import collectionSlider1 from "../assets/images/collection-slider-1.png";
import collectionSlider2 from "../assets/images/collection-slider-2.png";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/connectors"
import { connectWallet } from "../utils/connectWallet";


const Collection = () => {

    const [loaded, setLoaded] = useState(false)

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

    const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 8000,
    centerMode: true,
    centerPadding: '30px',
    infinite: true,
    pauseOnHover: false,
    arrows:false,
    dots:false,
    cssEase: 'linear'

      
    };
    return (

        <section className="collection-section">
            <div>
                <div className="grid-parent">
                    <div className="grid-child">
                        
                        <Slider {...settings}>
                            <div>
                            <img src={collectionSlider1} />
                            </div>
                            <div>
                            <img src={collectionSlider2} />
                            </div>
                                
                        </Slider>
                        
                    </div>
                    <div className="grid-child z-index-plus-1 align-self-center text-center">
                        <div className="collection text-center">
                        {active
                                ? (
                                    <button className="btn btn-primary btn-wallet p-2 mb-0 mb-md-3">CONNECTED</button>
                                ) :<button onClick={(e) => {
                                    connectWallet(activate, "Error");
                                    e.preventDefault()
                                }} className="btn btn-primary btn-wallet p-2 mb-0 mb-md-3">CONNECT YOUR WALLET</button>
                            }
                           
                            {/* <img src={collection_heading} /> */}
                            <div>
                                <h1>COLLECTIONS</h1>
                                <img className="celestial-angels" src={celestialAngels} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Collection;