import { Container, Grid } from "@material-ui/core";
import React from "react";

class Layout extends React.Component {
  render() {
    return (
      <Container maxWidth="sm" style={{ minHeight: "80vh" }}>
        {this.props.children}
      </Container>
    );
  }
}

export default Layout;
