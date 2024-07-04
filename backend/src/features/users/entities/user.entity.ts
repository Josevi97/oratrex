import { DataTypes } from "sequelize";
import db from "../../../../database";
import { UserFields } from "../constants/user.fields";

const UserEntity = db.define('User', {
  [UserFields.name]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [UserFields.address]: {
    type: DataTypes.STRING,
    allowNull: false
  },
  [UserFields.username]: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  [UserFields.password]: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  [UserFields.code]: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

db.sync()
  .then(() => 'Sequalize sync completed')
  .catch(() => 'Error synchronizing database');

export default UserEntity;
