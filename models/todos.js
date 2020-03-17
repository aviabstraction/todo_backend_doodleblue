"use strict";


module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define(
    "todos",
    {
      todo_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      todo_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      is_completed: {
        type: DataTypes.BOOLEAN
      },
      expiry_date: {
        type: DataTypes.DATE
      },
      created_by: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      updated_by: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      is_active: { type: DataTypes.BOOLEAN, allowNull: false },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE
      }
    },
    {
      schema: "public",
      timestamps: false,
    }
  );
  todos.associate = function (models) {
    todos.belongsTo(models.user_profiles, { foreignKey: "profile_id" });
  };
  return todos;
};
