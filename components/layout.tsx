import { Container, Grid } from "@material-ui/core";
import React from "react";

class Layout extends React.Component {
  render() {
    return (
      <Container 
        maxWidth="sm"
        style={{minHeight: '80vh'}}
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="space-between"
          style={{ minHeight: '80vh' }}
        >
          {this.props.children}
        </Grid>
      </Container>
    )
  }
}

export default Layout