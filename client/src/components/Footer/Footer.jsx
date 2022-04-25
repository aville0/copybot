import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer">
      <div className="column-left">
        <h3>Company</h3>
        <p>About Us</p>
      </div>
      <div className="column-center">
        <h3>Contact Us</h3>
        <a href="9058065587">(905) 806-5587</a> <br></br>
        <a href="mailto:info@copybot.xyz">info@copybot.xyz</a>
      </div>
      <div className="column-right">
        <h3>Connect on Social</h3>
        <p>Facebook</p>
        <p>Instagram</p>
        <p>Twitter</p>
      </div>
    </div>
  );
};

export default Footer;
