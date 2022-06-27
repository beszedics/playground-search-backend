/* eslint-disable strict */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('playgrounds', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'name',
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'address',
      },
      latitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'latitude',
      },
      longitude: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        field: 'longitude',
      },
      hasSwing: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_swing',
      },
      hasSlide: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_slide',
      },
      hasCarousel: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_carousel',
      },
      hasSandbox: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_sandbox',
      },
      hasBalancingBridge: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_balancing_bridge',
      },
      hasTeeter: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_teeter',
      },
      hasRopePyramid: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_rope_pyramid',
      },
      hasSquirrelWheel: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_squirrel_wheel',
      },
      hasHanging: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_hanging',
      },
      hasObstacleCourse: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_obstacle_course',
      },
      hasRestHouse: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        field: 'has_rest_house',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('playgrounds');
  },
};
