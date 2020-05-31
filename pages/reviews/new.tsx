import Head from 'next/head'
import Link from 'next/link'
import { AromaCard } from '../../components/review/aroma'
import { Container, Box, Typography, ButtonGroup, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React from 'react'
import _ from 'lodash'
import ScoreCard from '../../components/scorecard'

const forwardHops = {
  "aroma": "appearance",
  "appearance": "flavor",
  "flavor": "mouthfeel",
  "mouthfeel": "DONE"
}

const backwardHops = {
  "aroma": "CANCEL",
  "appearance": "aroma",
  "flavor": "appearance",
  "mouthfeel": "flavor",
}

interface CategoryScores {
  aroma: number | null;
  appearance: number | null;
  flavor: number | null;
  mouthfeel: number | null;
}

interface ReviewState {
  scores: CategoryScores;
  currentCategory: string;
}

interface ReviewProps {}

class Review extends React.Component<ReviewProps,ReviewState> {
  state: ReviewState = {
    scores: {
      aroma: null,
      appearance: null,
      flavor: null,
      mouthfeel: null,
    },
    currentCategory: "aroma",
  }

  constructor(props) {
    super(props)
    this.updateScore = this.updateScore.bind(this)
    this.goForward = this.goForward.bind(this)
    this.setState = this.setState.bind(this)
  }

  render() {
    return (
      <Container maxWidth="sm">
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="space-between"
          style={{ minHeight: '80vh' }}
        >
          <ScoreCard
            updateScoreCallback={this.updateScore}
            category={this.state.currentCategory}
            selectedScore={_.get(this.state.scores, this.state.currentCategory)}
          />
          <Box flex={1} flexDirection="row" justifyContent="stretch">
            { _.get(backwardHops, this.state.currentCategory) === "CANCEL" ? 
              <Button 
                color="primary"
                href="/"
              >
                Cancel
              </Button>
            :
              <Button
                color="primary"
                onClick={() => console.log("TODO GO BACK")}
              >
                Back
              </Button>
            }
            { _.get(forwardHops, this.state.currentCategory) === "DONE" ?
              <Button
                color="primary"
                href="/"
                variant="contained"
                disabled={_.get(this.state.scores, this.state.currentCategory) === null}
                onClick={() => console.log("TODO API CALL AND REDIRECT")}
              >
                Submit
              </Button>
            :
              <Button
                color="primary"
                variant="contained"
                onClick={this.goForward}
                disabled={_.get(this.state.scores, this.state.currentCategory) === null}
              >
                Next
              </Button> 
            }
          </Box>
        </Grid>
      </Container>
    )
  }

  updateScore(category: string, n: number) {
    let scores = {...this.state.scores}
    _.set(scores, category, n)
    this.setState({
      ...this.state,
      scores: scores,
    })
  }

  goForward() {
    const nextCategory = _.get(forwardHops, this.state.currentCategory)
    this.setState({
      ...this.state,
      currentCategory: nextCategory,
    })
  }
}

export default Review
