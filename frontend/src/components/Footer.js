import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom"
import whitelogo from "../assets/images/logo.png"
import opensea from "../assets/images/opensea.png";
import logo_3 from "../assets/images/logo-3.png";
import name_1 from "../assets/images/name-1.png";
import logo_fallen_1 from "../assets/images/logo-fallen-1.png";
import logo_guardian_1 from "../assets/images/logo-guardian-1.png";
import logo_pixel_1 from "../assets/images/logo-pixel-1.png";


function Footer() {

    return (

        <footer className="footer-section py-5">

            <Row className="mx-0 flex-column flex-md-row gap-5 gap-md-0 align-items-center">
                <Col xs={12} md={6} lg={3} className="footer-first">
                    
                        
                            <img src={logo_3} className="footer-logo" />
                       

                      
                            <img src={name_1} width="60%"  />
                        

                    
                </Col>

                <Col md={6} lg={3}>
                    <Row className="align-items-center h-100 gap-4 gap-md-0" >
                        <Col>
                            <img src={logo_fallen_1} className="footer-logo"/>
                        </Col>
                        <Col>
                            <img src={logo_guardian_1} className="footer-logo"/>
                        </Col>
                        <Col>
                            <img src={logo_pixel_1} className="footer-logo"/>
                        </Col>
                    </Row>
                </Col>

                <Col md={6} lg={3}>
                    <p>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquareprehenderit in voluptate velit esse cillum dolore eu
                    </p>
                </Col>

                <Col md={6} lg={3}>
                    <div className="center-it">
                        <ul className="top-social">
                            <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                            <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                            <li><a href=""><i class="fa-brands fa-discord"></i></a></li>
                            <li style={{paddingBottom:"2px"}}><a href=""><img src={opensea} /></a></li>
                        </ul>
                    </div>
                </Col>

            </Row>

        </footer>

    )

}

export default Footer;