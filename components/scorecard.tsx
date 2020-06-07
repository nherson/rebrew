import React from "react";
import { Grid, Box, Typography, ButtonGroup, Button } from "@material-ui/core";
import _ from "lodash";

interface CallbackFunc {
  (string, number): void;
}

interface ScoreCardProps {
    updateScoreCallback: CallbackFunc;
    category: string;
    selectedScore: number | null;
    title?: string;
    description?: string;
}

const defaultDescription = 'Choose a score from 1 to 5 based on the style'

class ScoreCard extends React.Component<ScoreCardProps> {
    render() {
      return (
        <>
          <Box>
            <Typography variant="h4" align="center" component="h1" color="textPrimary">
              {_.isNil(this.props.title) ? _.capitalize(this.props.category) : this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="h6" align="center" component="h1">
              {_.isNil(this.props.description) ? defaultDescription : this.props.description}
            </Typography>
          </Box>
          <Box>
            <ButtonGroup size="large" color="primary" aria-label="outlined primary button group">
              {_.times(5, (n) => {
                return (
                  <Button
                    key={`score-${n}`}
                    onClick={() => this.props.updateScoreCallback(this.props.category, n+1)}
                    variant={this.props.selectedScore === n+1 ? "contained" : "outlined"}
                  >
                    {n+1}
                  </Button>
                )
              })}
            </ButtonGroup>
          </Box>
        </>
      )
    }
}

export default ScoreCard