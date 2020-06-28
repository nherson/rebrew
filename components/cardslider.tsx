// TODO: WIP NOT USED ANYWHERE
import { useState, Dispatch, SetStateAction } from "react";
import { Slide, Box } from "@material-ui/core";
import _ from "lodash";
import React from "react";

const left = "left";
const right = "right";

export default function useCardSlider() {
  //let setDirection: Dispatch<SetStateAction<string>>
  const [direction, setDirection] = useState(right);
  const [current, setCurrent] = useState(0);
  //const [next, setNext] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const handleForward = () => {
    // transition current item out to the left (exit as if it entered from right)
    setDirection(left);
    setTransitioning(true);
    setTimeout(() => {
      console.log("GO FORWARD");
      setDirection(right);
      setCurrent(current + 1);
      setTransitioning(false);
    }, 250);
  };

  const handleBack = () => {
    // transition current item out to the right (exit as if it entered from left)
    setDirection(right);
    setTransitioning(true);
    setTimeout(() => {
      setDirection(left);
      setCurrent(current - 1);
      setTransitioning(false);
    }, 250);
  };

  return {
    cardSliderProps: {
      current: current,
      direction: direction,
      transitioning: transitioning,
    },
    goForward: handleForward,
    goBackward: handleBack,
  };
}

export const CardSlider = ({ children, current, direction, transitioning }) => {
  console.log("RERENDER", current, direction, transitioning);
  return (
    <Box>
      {React.Children.map(children, (child, i) => {
        return (
          <Slide
            direction={direction}
            in={i === current && !transitioning}
            mountOnEnter
            unmountOnExit
          >
            <div>{child}</div>
          </Slide>
        );
      })}
    </Box>
  );
};
