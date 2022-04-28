import { Navbar, Container, Nav, NavDropdown,Button,Offcanvas } from "react-bootstrap";
import Logo from "../assets/images/logo.png";
import opensea from "../assets/images/opensea.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {

  // const [navbar, setNavbar] = useState(false);


  // useEffect(() => {
  //     window.addEventListener("scroll", () => {
  //       if (window.pageYOffset > 80) {
  //         setNavbar(true);
  //       } else {
  //         setNavbar(false);
  //       }
  //     });
  //   }, []);

  function openNav() {
    document.getElementById("mySidenav").style.width = "90%";
 }

 function closeNav() {
    document.getElementById("mySidenav").style.width = "0";

 }


  return (

    <>

  
      <Navbar collapseOnSelect expand="lg" className="custom-nav" variant="dark">
        <Container fluid className="w-100">

         

          <span onClick={(e) => openNav()} className="opennav">
                  <i class="fa fa-bars"></i>
          </span>
          <div id="mySidenav" className="justify-content-md-around gap-2 sidenav">
          <a href="javascript:void(0)" class="closebtn" onClick={(e) => closeNav()}>&times;</a>
          <Link to={"/"} className="logo">
            <img src={Logo} />
          </Link>
          <Nav>
              <a href="#about-section">About</a>
              <a href="#roadmap-section">Roadmap</a>
              <a href="#drawing-concept-section">Drawing Concept</a>
              <a href="#team-section">Team</a>
              <a href="#collection-section">Collections</a>
              <a href="#faqs-section">FAQ</a>
              <Link to={"#news-section"} href="#">News</Link>
              <Link to="nft">NFT's</Link>
          </Nav>

          <div className="d-flex justify-content-center">
              <ul className="top-social">
                <li><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                <li><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                <li><a href=""><i class="fa-brands fa-discord"></i></a></li>
                <li><a href="" className="img-icon"><img src={opensea} /></a></li>
              </ul>
          </div>

          </div>



        </Container>
      </Navbar>

    </>

  )



}

export default Header;