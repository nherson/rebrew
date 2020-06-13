import React from "react";
import { Grid, Box, Typography, ButtonGroup, Button } from "@material-ui/core";
import _ from "lodash";

interface CallbackFunc {
  (n: number): void;
}

interface ScoreCardProps {
  callback: CallbackFunc;
  category: string;
  selected: number | null;
  title?: string;
  description?: string;
}

const defaultDescription = "Choose a score from 1 to 5 based on the style";

export default function ScoreCard({
  callback,
  selected,
  title,
  category,
  description,
}: ScoreCardProps) {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          align="center"
          component="h1"
          color="textPrimary"
        >
          {_.isNil(title) ? _.startCase(_.toLower(category)) : title}
        </Typography>
        <Typography
          color="textSecondary"
          variant="h6"
          align="center"
          component="h1"
        >
          {_.isNil(description) ? defaultDescription : description}
        </Typography>
      </Box>
      <Box>
        <ButtonGroup
          size="large"
          color="primary"
          aria-label="outlined primary button group"
        >
          {_.times(5, (n) => {
            return (
              <Button
                key={`score-${n}`}
                onClick={() => callback(n + 1)}
                variant={selected === n + 1 ? "contained" : "outlined"}
              >
                {n + 1}
              </Button>
            );
          })}
        </ButtonGroup>
      </Box>
    </>
  );
}
