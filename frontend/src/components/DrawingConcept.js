import { Row, Col, Container, Button } from "react-bootstrap";
import concept_1 from "../assets/images/concept-1.png";


const DrawingConcept = () => {
    return (
        <section className="drawing-concept-section">
            <Container className="">
                <div className="drawing-concept">
                    <h1 className="text-center mb-2 mb-md-5 section-title">DRAWING CONCEPT</h1>

                    {/* Images will be placed here. */}
                    {/* <Row>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                        <Col></Col>
                    </Row> */}

                    <img src={concept_1} />
                   


                    <div className="box">
                        <p className="description">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default DrawingConcept;