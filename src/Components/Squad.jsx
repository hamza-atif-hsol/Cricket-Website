import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Amir from "../images/amir.jpg";
import Bobby from "../images/bobby.jpg";
import Fakhar from "../images/fakhar.jpg";
import Lala from "../images/lala.jpg";
import Rizwan from "../images/rizwan.jpg";
import Naseem from "../images/naseem.jpeg";
import Malik from "../images/malik.jpeg";
import Shaheen from "../images/shaheen.jpeg"

function Squad() {
  return (
    <div className='squad-main-container'> 
      <h2 className='squad-heading'>Squad</h2>
      <div className="squad-sub-container">
      <Card style={{ width: '18rem' }}>
        <img className='squad-img' src={Shaheen} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Shaheen Afridi</Card.Title>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <img className='squad-img'  src={Amir} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Muhammad Amir</Card.Title>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <img className='squad-img' src={Bobby} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Babar Azam</Card.Title>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <img className='squad-img' src={Malik} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Shoaib Malik</Card.Title>
       
      </Card.Body>
    </Card>
      </div>
      <div className="squad-sub-container">
      <Card style={{ width: '18rem' }}>
      <img className='squad-img' src={Naseem} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Naseem Shah</Card.Title>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <img className='squad-img' src={Rizwan} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Muhammad Rizwan</Card.Title>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <img className='squad-img' src={Fakhar} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Fakhar Zaman</Card.Title>
       
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
    <img className='squad-img' src={Lala} alt="" srcset="" />
      <Card.Body>
        <Card.Title className='squad-title'>Shahid Afridi</Card.Title>
       
      </Card.Body>
    </Card>
      </div>
    </div>
  )
}

export default Squad
