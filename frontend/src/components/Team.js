import { Col, Container, Row } from "react-bootstrap";
import designer from "../assets/images/designer.png"
import marketingManager from "../assets/images/marketing-manager.png"
import administrativeBusiness from "../assets/images/administrative-business.png"
import softwareEngineer from "../assets/images/software-engineer.png"

function Team() {

    return (

        <>

            <section className="team-section ">

                <Container className="h-100">

                    <div className="team">
                        <h2 className="section-title text-center mb-3 mb-md-5">Team</h2>

                        <Row className="gap-lg-0">


                            <Col lg={3} md={6}>


                                <div className="team-box">

                                    <div className="position-relative">

                                        <img src={designer} />

                                        <h4 className="yellow mt-1">Designer</h4>

                                        <h3>GODYAR</h3>
                                    </div>

                                    <ul className="team-social">
                                        <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                    </ul>

                                </div>


                            </Col>

                            <Col lg={3} md={6}>


                                <div className="team-box">

                                    <div className="position-relative">


                                        <img src={marketingManager} />

                                        <h4 className="green mt-1">Marketing Manager</h4>

                                        <h3>Mahan P</h3>

                                    </div>

                                    <ul className="team-social">
                                        <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                    </ul>

                                </div>


                            </Col>


                            <Col lg={3} md={6}>


                                <div className="team-box">

                                    <div className="position-relative">

                                        <img src={administrativeBusiness} />

                                        <h4 className="purple mt-1">ADMINISTRATIVE BUSINESS</h4>

                                        <h3>Ali P</h3>

                                    </div>

                                    <ul className="team-social">
                                        <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                    </ul>

                                </div>


                            </Col>

                            <Col lg={3} md={6}>


                                <div className="team-box">

                                    <div className="position-relative">


                                        <img src={softwareEngineer} />

                                        <h4 className="blue mt-1">SOFTWARE ENGINEER</h4>

                                        <h3>Amireza</h3>

                                    </div>

                                    <ul className="team-social">
                                        <li><a href="#"><i class="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="#"><i class="fa-brands fa-instagram"></i></a></li>
                                    </ul>

                                </div>


                            </Col>

                        </Row>
                    </div>


                </Container>

            </section>

        </>

    )

}

export default Team;