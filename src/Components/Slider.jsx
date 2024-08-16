import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image1 from "../images/image4.jpg";
import image2 from "../images/image1.jpg";
import image3 from "../images/image5.jpg";


function Slider() {
  return (
    <div>
      <Carousel>
      <Carousel.Item>
        <img className='slider-image' src={image1} alt="" srcset="" />
        
      </Carousel.Item>
      <Carousel.Item>
      <img className='slider-image' src={image2} alt="" srcset="" />
       
      </Carousel.Item>
      <Carousel.Item>
      <img className='slider-image' src={image3} alt="" srcset="" />
        
      </Carousel.Item>
    </Carousel>
    </div>
  )
}

export default Slider
