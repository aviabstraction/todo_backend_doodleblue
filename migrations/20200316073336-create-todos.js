'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('todos', {
      todo_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      todo_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_completed: {
        type: Sequelize.BOOLEAN
      },
      expiry_date: {
        type: Sequelize.DATE
      },
      created_by: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "user_profiles"
          },
          key: "profile_id"
        }
      },
      updated_by: {
        allowNull: false,
        type: Sequelize.UUID,
        onDelete: "CASCADE",
        references: {
          model: {
            tableName: "user_profiles"
          },
          key: "profile_id"
        }
      },
      is_active: { type: Sequelize.BOOLEAN, allowNull: false },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('todos');
  }
};