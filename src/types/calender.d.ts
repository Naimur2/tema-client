export interface IEvent {
  _id?: string;
  name?: string;
  team_id?: string;
  starting_date?: string;
  ending_date?: string;
  __v?: number;
  image?: string;
  location?: string;
}

export interface ICalenderData {
  message?: string;
  data?: IEvent[];
}

export interface ICalenderDataArgs {
  month: number | string;
  year: number | string;
}
