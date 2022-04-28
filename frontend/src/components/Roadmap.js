import bgMerged from "../assets/images/road-map-tree1-merged.png"

import logoGuardian from "../assets/images/logo-guardian-1.png"
import logoFallen from "../assets/images/logo-fallen-1.png"
import logoPixel from "../assets/images/logo-pixel-1.png"
import { Container } from "react-bootstrap"
import DrawingConcept from "./DrawingConcept"
import DownArrow from "./DownArrow"

const RoadmapDesktop = () => {
    return (
        <section className="roadmap-section d-none d-lg-block">
            <div className="roadmap">

                <h1 className="text-center mb-5 section-title">ROADMAP</h1>

                <div className="grid-parent">
                    <div className="grid-child-curve">
                        <img src={bgMerged} className="" />
                    </div>

                    <div className="grid-child-text">


                        <div className="grid-parent-roadmap-parts mx-2">
                            <div className="grid-child-roadmap-part-1 d-flex align-items-center gap-2">
                                <h2>1</h2>
                                <div>
                                    <h3>GUARDIAN ANGLES</h3>
                                    <p>
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    </p>
                                </div>
                            </div>

                            <div className="grid-child-roadmap-part-2 d-flex align-items-center" style={{ marginBottom:"12rem"}}>
                                <h2>2</h2>
                                <div>
                                    <h3>FALLEN ANGLES</h3>
                                    <p>
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div className="grid-child-text grid-child-roadmap-part-3 d-flex align-items-center">
                        <h2>3</h2>
                        <div>
                            <h3>MALEYONENT BENEYONENT</h3>
                            <p>
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div id="drawing-concept-section" className="position-relative" style={{
                 paddingBottom:"5rem"}}>
                <DrawingConcept />
                <DownArrow to="team-section" />
            </div>

           

        </section>
    )
}

const RoadmapMobile = () => {
    return (
        <div className="roadmap-section-mobile d-lg-none">
            <Container>
                <h1 className="text-center section-title mb-2">ROADMAP</h1>
                <div className="logo-guardian mb-5">
                    <img src={logoGuardian} />
                    <div>

                        <div className="d-flex align-items-baseline gap-3">
                            <h1>1</h1>
                            <h3>GUARDIAN ANGLES</h3>
                        </div>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>

                <div className="logo-fallen text-end mb-5">
                    <img src={logoFallen} />
                    <div>
                        <div className="d-flex align-items-baseline justify-content-end gap-3">
                            <h1>2</h1>
                            <h3>FALLEN ANGLES</h3>
                        </div>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>

                <div className="logo-pixel mb-5">
                    <img src={logoPixel} />
                    <div>
                        <div className="d-flex align-items-baseline gap-3">
                            <h1>3</h1>
                            <h3>MALEYONENT BENEYONENT</h3>
                        </div>
                        <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

const Roadmap = () => {
    return (
        <>
            <RoadmapMobile />
            <RoadmapDesktop />
        </>
    )
}

export default Roadmap;