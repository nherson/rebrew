import _ from "lodash";

export const anyNil = (...items) => {
  return _.reduce(
    items,
    (hasPrevNil, cur) => hasPrevNil || _.isNil(cur),
    false
  );
};
