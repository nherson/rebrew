"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Reviews",
          "createdAt",
          {
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Submissions",
          "createdAt",
          {
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Reviews",
          "updatedAt",
          {
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Submissions",
          "updatedAt",
          {
            type: Sequelize.DataTypes.DATE,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Reviews", "createdAt", { transaction: t }),
        queryInterface.removeColumn("Submissions", "createdAt", {
          transaction: t,
        }),
        queryInterface.removeColumn("Reviews", "updatedAt", { transaction: t }),
        queryInterface.removeColumn("Submissions", "updatedAt", {
          transaction: t,
        }),
      ]);
    });
  },
};
