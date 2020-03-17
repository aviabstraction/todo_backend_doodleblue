"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "user_profiles",
      {
        profile_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          onDelete: "CASCADE",
          references: {
            model: {
              tableName: "users",
              schema: "auth"
            },
            key: "user_id"
          }
        },
        user_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: { type: Sequelize.STRING, allowNull: false },
        contact_number: { type: Sequelize.STRING, allowNull: false },
        is_active: { type: Sequelize.BOOLEAN, allowNull: false },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },
      {
        schema: "public",
        timestamps: false
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("user_profiles");
  }
};
