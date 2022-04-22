import React, {useEffect, useState} from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import Logo from "../assets/images/logo 2.png";
import opensea from "../assets/images/opensea.svg";
import Header from "../components/Header"
import Team from "../components/Team";
import FAQs from "../components/FAQs";
import DownArrow from "../components/DownArrow";
import JoinUs from "../components/JoinUs";
import DrawingConcept from "../components/DrawingConcept";
import About from "../components/About";
import Roadmap from "../components/Roadmap";
import Footer from "../components/Footer"
import Collection from "../components/Collection";
import loader from "../assets/images/loader.gif"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useWeb3React } from "@web3-react/core";
import { injectedConnector } from "../utils/connectors"
import { connectWallet } from "../utils/connectWallet";




function Home() {

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

    var myVar;

    function myFunction() {
        myVar = setTimeout(showPage, 3000);
    }

    function showPage() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
    }

    myFunction();
    return (

        <>

            <div id="loader">
                <img src={loader} />
            </div>

            <div style={{ display: "none" }} id="myDiv" class="animate-bottom">

                <Header />

                <section className="section1">

                    <div className="h-100">

                        <Container>

                            <div className="main-title col-xl-5 col-lg-7 col-md-9 col-12">

                                <div className="d-flex align-items-center celestial-angels">
                                    <img className="hero-logo" src={Logo} />
                                    <div className="">
                                        <p className="celestial">Celestial</p>
                                        <p className="angels">Angels</p>
                                    </div>
                                </div>

                                <div className="opensea justify-content-center flex-column flex-md-row">

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim addfgfsdsshfjshkjvnbn</p>

                                    <a href="https://opensea.io/" target="_blank" className="primary-btn custom-btn image-btn">
                                        <img src={opensea} /><span className="">Open Sea</span>
                                    </a>
                                </div>


                            </div>

                        </Container>

                    </div>





                    <div class="work-arrow">



                        <div className="mb-3">

                            {active
                                ? (
                                    <button className="btn btn-primary btn-wallet">CONNECTED</button>
                                ) :<button onClick={(e) => {
                                    connectWallet(activate, "Error");
                                    e.preventDefault()
                                }} className="btn btn-primary btn-wallet">CONNECT YOUR WALLET</button>
                            }

                            {/* <button onClick={(e) => {
                                    connectWallet(activate, "Error");
                                    e.preventDefault()
                                }} className="btn btn-primary btn-wallet">CONNECT YOUR WALLET</button> */}
                        </div>

                        <a href="#about-section">
                            SCROLL TO DISCOVER
                        <div class="down-arrow">
                            
                                <div class="chevron"></div>
                                <div class="chevron"></div>
                                <div class="chevron"></div>
                           
                        </div>
                        
                        </a>

                    </div>

                </section>

                <div id="about-section" className="position-relative">
                    <About />
                    <DownArrow to="roadmap-section" />
                </div>



                <div id="roadmap-section" className="position-relative">
                    <Roadmap />
                    <DownArrow to="drawing-concept-section" />
                </div>



                <section className="girl-section-container py-5 pt-0">
                    <div id="drawing-concept-section" className="position-relative">
                        <DrawingConcept />
                        <DownArrow to="team-section" />
                    </div>

                    <div id="team-section" className="position-relative">
                        <Team />
                        <DownArrow to="collection-section" />
                    </div>

                </section>

                <div id="collection-section" className="position-relative">
                    <Collection />
                    <DownArrow to="faqs-section" />
                </div>

                <section className="girl-section-container pt-0">
                    <div id="faqs-section" className="position-relative">
                        <FAQs />
                        <DownArrow to="joinus-section" />
                    </div>
                    <div id="joinus-section" className="position-relative">
                        <JoinUs />
                    </div>
                </section>

                <div id="footer-section" className="position-relative">
                    <Footer />
                </div>

            </div>

        </>

    )
}

export default Home;