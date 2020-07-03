import _ from "lodash";

export const anyNil = (...items) => {
  console.log("REDUCE");
  return _.reduce(
    items,
    (hasPrevNil, cur) => hasPrevNil || _.isNil(cur),
    false
  );
};
