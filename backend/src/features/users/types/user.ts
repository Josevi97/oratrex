import { UserFields } from "../constants/user.fields";

export type User = {
  id: string;
  [UserFields.name]: string;
  [UserFields.address]: string;
  [UserFields.username]: string;
  [UserFields.password]: string;
  [UserFields.code]: string;
  qr?: string;
}
