import React from "react";
import "./contact.css";
import contactimage from "C:/Users/aswin/OneDrive/Desktop/project/client/src/assets/contactpage.jpg";
import addressimage from "C:/Users/aswin/OneDrive/Desktop/project/client/src/assets/contactaddress.jpg";

export default function Contact() {
  return (
    <div className="contact">
      <div className="contactImage">
        <img src={contactimage} alt="image" className="contactimg" />
        <div className="text-overlay">
          <h1>CONTACT US</h1>
          <p>Home/Contact</p>
        </div>
      </div>
      <div className="getintouch">
        <h1>GET IN TOUCH</h1>
        <hr
          style={{
            borderTop: "1px solid #000",
            margin: "60px auto",
            width: "50%",
          }}
        />
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5435155344594!2d76.90342787472107!3d8.543618141499643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05beb808396e3f%3A0xbdb296f9c4101374!2sCGPU!5e0!3m2!1sen!2sin!4v1685858611286!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="addressContainer">
        <div className="box1">
          <h1
            style={{
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            ADDRESS
          </h1>
          <p
            style={{
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Career Guidance and Placement Unit ( CGPU ) <br></br>College of
            Engineering,<br></br>
            Thiruvananthapuram - 695016<br></br> KERALA, South India.<br></br>{" "}
            Phone: 0471 - 2595152, 2515682
          </p>
        </div>
        <div className="oval1">
        <img src={addressimage} alt="Image" />
        </div>
      </div>

      <div className="contactContainer">
        <div className="box2">
          <h1
            style={{
              color: "white",
              fontSize: "20px",
              textAlign: "center",
              padding: "20px",
            }}
          >
            CONTACT PERSON
          </h1>
        </div>
      </div>
    </div>
  );
}
