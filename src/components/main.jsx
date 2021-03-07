import React, { Component } from "react";
import { Joystick } from "react-joystick-component";
import { Jumbotron, Navbar, Card, Button } from "react-bootstrap";
import img from "./image.svg";
import axios from "axios";
class Main extends Component {
  constructor() {
    super();
    this.handleMove = this.handleMove.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.state = {
      lights: "on",
    };
  }

  handleLights = () => {
    if (this.state.lights === "on") {
      this.setState({ lights: "off" });
      this.requestLights("off");
    }
    if (this.state.lights === "off") {
      this.setState({ lights: "on" });
      this.requestLights("on");
    }
  };

  handleMove = async (e) => {
    let yResult = "";

    if (e.y >= 0) {
      yResult = "up";
    }
    if (e.y <= -1) {
      yResult = "down";
    }
    let directionObj = {
      angle: yResult,
      direction: e.direction,
    };

    await axios.post("/motor/direction", directionObj);
  };

  handleStop = async (e) => {
    let request = { response: e.type };
    await axios.post("/motor/off", request);
  };

  requestLights = async (mode) => {
    const req = { response: mode };
    await axios.post("light", req);
  };

  render() {
    return (
      <div className="d-flex h-100 text-center text-white bg-dark">
        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
          <header className="mb-auto">
            <Navbar>
              <Navbar.Brand href="#home">Car Pilot</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Button variant="secondary" onClick={this.handleLights}>
                  Lights {this.state.lights}
                </Button>
              </Navbar.Collapse>
            </Navbar>
          </header>

          <Jumbotron fluid={false}>
            <Card className="bg-dark text-white">
              <Card.Img src={img} alt="Card image" width="420" height="310" />
              <Card.ImgOverlay>
                <Card.Title>CarVideo</Card.Title>
              </Card.ImgOverlay>
            </Card>
          </Jumbotron>

          <div className="joystick">
            <Joystick
              size={150}
              baseColor="gray"
              stickColor="white"
              move={this.handleMove}
              stop={this.handleStop}
              throttle={500}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
