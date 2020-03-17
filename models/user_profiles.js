"use strict";


module.exports = (sequelize, DataTypes) => {
  const user_profiles = sequelize.define(
    "user_profiles",
    {
      profile_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      user_id: {
        allowNull: false,
        type: DataTypes.UUID
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: { type: DataTypes.STRING, allowNull: false },
      contact_number: { type: DataTypes.STRING, allowNull: false },
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
  user_profiles.associate = function (models) {
    user_profiles.belongsTo(models.users, {
      foreignKey: "user_id"
    });
    user_profiles.hasMany(models.todos, {
      foreignKey: "profile_id"
    })


  };
  return user_profiles;
};
