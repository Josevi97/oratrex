import { UserFields } from "../constants/user.fields";

export type UserDto = {
  [UserFields.name]: string,
  [UserFields.address]: string,
  [UserFields.username]: string,
  [UserFields.password]: string,
  [UserFields.code]: string,
}
