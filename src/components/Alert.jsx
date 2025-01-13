// src/components/Alert.jsx

import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bold",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "14px",
      margin: "20px auto",  // Centers the alert horizontally
      padding: "10px",
      width: "50%",         // Controls the width
      maxWidth: "400px",    // Prevents it from being too wide
      minWidth: "250px",    // Prevents it from being too narrow
      boxSizing: "border-box",
      display: "block",     // Ensures it's treated as a block element
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(0, 0, 255)'; // Blue text
    this.bgColor = 'rgb(230, 240, 255)'; // Softer light blue background
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'rgb(255, 0, 0)'; // Red text
    this.bgColor = 'rgb(255, 230, 230)'; // Light red background for contrast
  }
}

export { InfoAlert, ErrorAlert };
