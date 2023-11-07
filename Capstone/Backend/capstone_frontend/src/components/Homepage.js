import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Homepage.css";
// I start off by import react,Link my CSS page and styling components from react-bootstrap

// I then create the function component homepage this will be my landing page
function Homepage() {
  // I then return the div and class it as body inside the body div I have the layout of my landing page
  // I use h1,h4,p tags and my imported Navbar,card and button from react bootstrap and I add my content inside them.
  return (
    <div className="body">
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>🍎 Tunes </Navbar.Brand>
          </Container>
        </Navbar>
      </Container>
      <div className="search-path">
        <h1>Welcome !!</h1>
        <h4>To</h4>
        <h1>🍎 Tunes</h1>
        <p>
          Welcome to 🍎 Tunes to proceed to the search page click the button
          below ↓
        </p>
      </div>
      <div className="button-con">
        <Link to={"/search"}>
          <Button variant="primary" size="lg" active>
            Go to Search
          </Button>{" "}
        </Link>
      </div>
      <div className="Footer">
        <Card>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>🍎 Tunes is App that uses a Itunes API to retrieve music</p>
              <footer className="blockquote-footer">
                <cite title="Source Title">Created by Zubair Hoosain</cite>
              </footer>
            </blockquote>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

// I then export my component

export default Homepage;
