export interface UserAccessData {
  id: number;
  username: string;
  userRoleId: number;
  exp?: Date;
  token: string;
}
