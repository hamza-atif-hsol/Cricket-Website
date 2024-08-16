import React from "react";
import pcb from "../images/pcb.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-img-section">
        <img className="pcb-logo" src={pcb} alt="" srcset="" />
      </div>
      <div className="footer-text-section1">
        <ul className="unorder-list">
          <Link className="nav-links" to="/home">
            <li>Home</li>
          </Link>
          <Link className="nav-links" to="/matches">
            <li>Matches</li>
          </Link>
          <Link className="nav-links" to="/home">
            <li>MITV</li>
          </Link>
          <Link className="nav-links" to="/players">
            <li>Squad</li>
          </Link>
        </ul>
      </div>
      <div className="footer-text-section2">
        <ul className="unorder-list">
          <Link className="nav-links" to="/home">
            <li>Latest Updates</li>
          </Link>
          <Link className="nav-links" to="/home">
            <li>Gallery</li>
          </Link>
          <Link className="nav-links" to="/shop">
            <li>Shop</li>
          </Link>
        </ul>
      </div>
      <div className="footer-text-section3">
        <ul className="unorder-list">
          <Link className="nav-links" to="/venue">
            <li>Stadium</li>
          </Link>
          <Link className="nav-links" to="/home">
            <li>Contact Us</li>
          </Link>
          <Link className="nav-links" to="/shop">
            <li>Shop</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
