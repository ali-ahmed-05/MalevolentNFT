import { Row, Col, Container, Button } from "react-bootstrap";
import discordTransparent from "../assets/images/discord-transparent.png"
import join from "../assets/images/join.png"
import joinVideo from "../assets/images/join-video.mp4"


const JoinUs = (props) => {
    return (
        <section className="joinus-section">
            <div className="joinus pb-5 pb-md-0">
                <Row className="mx-0">
                    <Col md={6} className="px-0">
                        {/* <img src={joinVideo} /> */}
                        <video className="w-100 h-100" src={joinVideo} loop={true} autoPlay={true} muted={true} controls={false} playsInline>

                        </video>
                    </Col>
                    <Col sm={12} md={6} className="">
                        <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="box col-12 col-lg-8">
                                <p className="description">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequa</p>
                                <div className="text-center">
                                    <Button className="mt-3 w-100"><img width={24} src={discordTransparent} className="me-2 mb-1" /><span>JOIN OUR DISCORD</span></Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default JoinUs;