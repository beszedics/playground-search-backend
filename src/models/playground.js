/* eslint-disable strict */

'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Playground extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Playground.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      hasSwing: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasSlide: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasCarousel: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasSandbox: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasBalancingBridge: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasTeeter: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasRopePyramid: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasSquirrelWheel: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasHanging: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasObstacleCourse: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      hasRestHouse: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'playground',
    },
  );
  return Playground;
};
