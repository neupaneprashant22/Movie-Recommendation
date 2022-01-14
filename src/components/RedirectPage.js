import React from "react";
class RedirectPage extends React.Component {
  componentDidMount() {
    console.log("Hello");
    window.location.replace("https://www.google.com");
  }
}
export default RedirectPage;
