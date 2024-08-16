import React from 'react';
import lahore from "../images/lahore.png";
import karachi from "../images/karachi.png";
import islamabad from "../images/islamabad.png";
import multan from "../images/multan.png";

function Features() {
  return (
    <>
    <h3 className='features-heading'>PSL Details</h3>
    <div>
        <div className="features-sub-heading">
            <div className="features-image1">
                <img className='features-img' src={lahore} alt="" srcset="" />
            </div>
            <div className="features-text">
                <p>13-08-2024</p>
            </div>
            <div className="features-image2">
                <img className='features-img' src={karachi} alt="" srcset="" />
            </div>
        </div>
    </div>
    <div>
        <div className="features-sub-heading">
            <div className="features-image1">
                <img className='features-img-isl' src={islamabad} alt="" srcset="" />
            </div>
            <div className="features-text">
                <p>13-08-2024</p>
            </div>
            <div className="features-image2">
                <img className='features-img' src={lahore} alt="" srcset="" />
            </div>
        </div>
    </div>
    <div>
        <div className="features-sub-heading">
            <div className="features-image1">
                <img className='features-img' src={karachi} alt="" srcset="" />
            </div>
            <div className="features-text">
                <p>13-08-2024</p>
            </div>
            <div className="features-image2">
                <img className='features-img-mul' src={multan} alt="" srcset="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Features
