import React, { Component } from "react";

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
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
    this.color = "#60FFDD";
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#FAD077";
  }
}

class OffLineAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "#FF007E";
  }
}

export { InfoAlert, ErrorAlert, OffLineAlert };
