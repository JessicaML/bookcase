import React from "react";
import { Link } from "react-router-dom";

const About = (props) => {
  return (
    <div className="header">
      <h1>About</h1>
      <div className="breadcrumb">
        <Link to="/"> Home </Link> |<Link to="/about"> About </Link> |
        <Link to="/bookcase" className="bookLink">
          Bookcase ({props.bookLength})
        </Link>
      </div>
      <div className="page">Welcome to the my Bookcase Application. This is a Book catalogue that will find your desired book, list tthe price and tell you some information</div>
    </div>
  );
};

export default About;
