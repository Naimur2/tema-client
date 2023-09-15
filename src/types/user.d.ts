export interface ITeamId {
  _id: string;
  name: string;
  color: string;
  score: number;
  image: string;
  __v: number;
}
export interface IUser {
  _id?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  mobile_number?: string;
  shirt_size?: string;
  arrival_date?: string;
  departure_date?: string;
  bed_preference?: string;
  role?: string;
  is_active?: boolean;
  team_id?: Partial<ITeamId>;
  image_path?: string;
  alargeDesc?: string;
  __v?: number;
}

export interface IUsersData {
  message?: string;
  data?: IUser[];
}

/* delete a user start */
export type IDeleteAUserArgs = string;

export interface IDeleteAUserRes {
  message?: string;
}
/* delete a user end */

/* get a user start */
export type IGetAUserArgs = string;

export interface IGetAUserRes {
  message?: string;
  data?: IUser;
}
/* get a user end */
