"use strict";

var _ = require("lodash");

const descriptors = [
  "acetaldehyde",
  "alcoholic",
  "astringent",
  "diacetyl",
  "dimethylSulfide",
  "estery",
  "grassy",
  "lightStruck",
  "metallic",
  "musty",
  "oxidized",
  "phenolic",
  "solvent",
  "sourAcidic",
  "sulfur",
  "vegetal",
  "yeasty",
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all(
        _.map(descriptors, (d) =>
          queryInterface.addColumn(
            "Reviews",
            d,
            {
              type: Sequelize.DataTypes.BOOLEAN,
              allowNull: false,
              defaultValue: false,
            },
            { transaction: t }
          )
        )
      );
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all(
        _.map(descriptors, (d) =>
          queryInterface.removeColumn("Reviews", d, { transaction: t })
        )
      );
    });
  },
};
