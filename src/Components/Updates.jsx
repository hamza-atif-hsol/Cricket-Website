import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import image1 from "../images/image1.jpeg";

function Updates() {
  return (
    <>
      <div className="updates-container">
        <h3 className="updates-heading">News and Updates</h3>
        <div className="updates-subcontainer">
          <Card style={{ width: "18rem" }}>
            <img className="slider-image" src={image1} alt="" srcset="" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", marginTop: "4%" }}>
            <img className="slider-image" src={image1} alt="" srcset="" />
            <Card.Body>
              <Card.Title>Cle</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
        <div className="updates-subcontainer">
          <Card style={{ width: "18rem" }}>
            <img className="slider-image" src={image1} alt="" srcset="" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem", marginTop: "4%" }}>
            <img className="slider-image" src={image1} alt="" srcset="" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Updates;
