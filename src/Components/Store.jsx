import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import shirt1 from '../images/shirt1.png';
import shirt2 from '../images/shirt2.png';
import shirt3 from '../images/shirt3.png';
import shirt4 from '../images/shirt4.png';
import shoes1 from '../images/shoes1.png';
import shoes2 from '../images/shoes2.png';
import shoes3 from '../images/shoes3.png';
import ball from '../images/ball.png';



function Store() {
  return (
    <div className='store-main-container'>
      <h2 className='store-heading'>Store</h2>
      <div className="store-sub-container">
      <Card classname="store-card" style={{ width: '18rem' }}>
      <img src={shirt4} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card classname="store-card" style={{ width: '18rem' }}>
    <img src={shirt1} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card classname="store-card" style={{ width: '18rem' }}>
    <img src={ball} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card classname="store-card" style={{ width: '18rem' }}>
    <img src={shoes3} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </div>
      <div className="store-sub-container">
      <Card classname="store-card" style={{ width: '18rem' }}>
        <img src={shoes2} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card classname="store-card" style={{ width: '18rem' }}>
    <img src={shoes1} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card classname="store-card" style={{ width: '18rem' }}>
    <img src={shirt2} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    <Card classname="store-card" style={{ width: '18rem' }}>
    <img src={shirt3} alt="" srcset="" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
      </div>
    </div>
  )
}

export default Store
