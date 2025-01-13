// src/components/Alert.jsx

import { Component } from 'react';
import '../App.css'; // Import the existing App.css

class Alert extends Component {
  render() {
    return (
      <div className={`Alert ${this.props.className}`}>
        <p>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  render() {
    return <div className="Alert InfoAlert">{this.props.text}</div>;
  }
}

class ErrorAlert extends Alert {
  render() {
    return <div className="Alert ErrorAlert">{this.props.text}</div>;
  }
}

export { InfoAlert, ErrorAlert };
