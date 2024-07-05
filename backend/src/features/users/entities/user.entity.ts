import { DataTypes, Model, Optional } from "sequelize";
import db from "../../../../database";
import { User } from "../types/user";

type UserAttributes = User & { id: string }
type UserCreationAttributes = UserAttributes;

class UserEntity extends Model<UserAttributes, Optional<UserCreationAttributes, 'id'>> {
  declare id: string;
  declare name: string;
  declare address: string;
  declare username: string;
  declare password: string;
  declare code: string;
}

UserEntity.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
  }
)

UserEntity.sync()
  .then(() => 'User table recreated')
  .catch(() => 'Error synchronizing database');

export default UserEntity;
