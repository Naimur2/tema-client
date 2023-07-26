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
  __v?: number;
}

export interface IUsersData {
  message?: string;
  data?: IUser[];
}
