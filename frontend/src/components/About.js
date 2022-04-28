import { Col, Container, Row } from "react-bootstrap";
import about from "../assets/images/about.png";
import aboutVideo from "../assets/images/about-video.mp4";
import about_Video from "../assets/images/about_video.mp4";
import DownArrow from "./DownArrow";

const About = () => {
    return (
        <section className="section2">
            <Row className="mx-0 gap-4 gap-lg-0">

                <Col lg={6} className="ps-0">
                    <div>
                        <div className="about mx-3 ms-md-5 mt-3">

                            <h2 className="section-title">About</h2>

                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."""Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in repr</p>

                        </div>

                    </div>
                </Col>

                <Col lg={6} className="pe-0 align-self-center">
                    {/* <img src={about} /> */}
                    <video className="mt-5 w-100" src={about_Video} loop={true} autoPlay={true} muted={true} controls={false} playsInline>

                    </video>

                </Col>

            </Row>


            

        </section >
    )
}

export default About;