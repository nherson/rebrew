import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import Layout from '../../components/layout'
import { Container, Box, Typography, ButtonGroup, Grid } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React from 'react'
import _ from 'lodash'
import ScoreCard from '../../components/scorecard'
import fetch from '../../lib/fetch'

// constants outlining each stage of the form
const AROMA = 'aroma'
const APPEARANCE = 'appearance'
const FLAVOR = 'flavor'
const MOUTHFEEL = 'mouthfeel'
const STYLE_ACCURACY = "styleAccuracy"
const COMMENTS = "comments"
const CONFIRMATION = "confirmation"

//const stages = [AROMA, APPEARANCE, FLAVOR, MOUTHFEEL, STYLE_ACCURACY, COMMENTS, CONFIRMATION]
const stages = [AROMA, APPEARANCE, FLAVOR, MOUTHFEEL, STYLE_ACCURACY, CONFIRMATION]

interface CategoryScores {
  aroma: number | null;
  appearance: number | null;
  flavor: number | null;
  mouthfeel: number | null;
  styleAccuracy: number | null;
}

interface ReviewState {
  scores: CategoryScores;
  comments: string;
  currentStage: string;
}

interface ReviewProps {}

class ReviewPage extends React.Component<ReviewProps,ReviewState> {
  state: ReviewState = {
    scores: {
      aroma: null,
      appearance: null,
      flavor: null,
      mouthfeel: null,
      styleAccuracy: null,
    },
    comments: "",
    currentStage: AROMA,
  }

  constructor(props) {
    super(props)
    this.updateScore = this.updateScore.bind(this)
    this.goForward = this.goForward.bind(this)
    this.goBackward = this.goBackward.bind(this)
    this.setState = this.setState.bind(this)
    this.submit = this.submit.bind(this)
  }

  render() {
    // Generate a view for each stage of the review form
    const scoreCards = new Map<string, JSX.Element>()
    // aroma, appearance, flavor and mouthfeel all look similar
    _.each(
      [AROMA, APPEARANCE, FLAVOR, MOUTHFEEL],
      (sense) => {
        scoreCards.set(
          sense, 
          <ScoreCard
            updateScoreCallback={this.updateScore}
            category={sense}
            selectedScore={_.get(this.state.scores, sense)}
          />
        )
      }
    )
    // style accuracy needs some careful wording
    scoreCards.set(
      STYLE_ACCURACY,
      <ScoreCard
        updateScoreCallback={this.updateScore}
        category={STYLE_ACCURACY}
        selectedScore={_.get(this.state.scores, STYLE_ACCURACY)}
        title="Style Accuracy"
        description="Is this beer brewed according to the style guidelines?"
      />
    )
    // confirmation page
    scoreCards.set(
      CONFIRMATION,
      <Typography>{JSON.stringify(this.state.scores)}</Typography>
    )
    return (
      <Layout>
        {scoreCards.get(this.state.currentStage)}
        {this.formButtons()}
      </Layout>
    )
  }

  formButtons() {
    return (
      <Box flex={1} flexDirection="row" justifyContent="stretch">
        { this.state.currentStage === AROMA ? 
          <Button 
            color="primary"
          >
            <Link href="/"><a>Cancel</a></Link>
          </Button>
        :
          <Button
            color="primary"
            onClick={this.goBackward}
          >
            Back
          </Button>
        }
        { this.state.currentStage === CONFIRMATION ?
          <Button
            color="primary"
            variant="contained"
            onClick={this.submit}
          >
            Submit
          </Button>
        :
          <Button
            color="primary"
            variant="contained"
            onClick={this.goForward}
            disabled={_.isNil(_.get(this.state.scores, this.state.currentStage))}
          >
            Next
          </Button> 
        }
      </Box>
    )
  }

  // Submit's the review and redirects back to the home page
  submit() {
    console.log("ASDASDASD")
    const review = {
      aromaScore: this.state.scores.aroma,
      appearanceScore: this.state.scores.appearance,
      flavorScore: this.state.scores.flavor,
      mouthfeelScore: this.state.scores.mouthfeel,
      styleScore: this.state.scores.styleAccuracy,
    }
    console.log(JSON.stringify(review))
    fetch(
      '/api/reviews',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(review),
      }
    ).then(
      () => Router.push('/')
    ).catch(
      // TODO: handle errors
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
    const next = _.nth(stages, _.indexOf(stages, this.state.currentStage)+1)
    this.setState({
      ...this.state,
      currentStage: next,
    })
  }

  goBackward() {
    const last = _.nth(stages, _.indexOf(stages, this.state.currentStage)-1)
    this.setState({
      ...this.state,
      currentStage: last,
    })
  }
}

export default ReviewPage
