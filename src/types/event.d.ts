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

export interface IEventsData {
  message?: string;
  data?: IEvent[];
}

export interface ITeamId {
  _id?: string;
  name?: string;
  color?: string;
  score?: number;
  __v?: number;
}

export interface ISingleEventData {
  message?: string;
  data?: Omit<IEvent, "team_id"> & { team_id?: ITeamId };
}

export type TSingleEventDataArg = {
  id: string | number | undefined;
};

export interface ICreateEventResponse {
  message?: string;
  data?: IEvent;
}

export interface IDeleteEventResponse {
  message?: string;
}

export type TDeleteEventArg = string | number | undefined;

export interface ICreateEventArgs
  extends Required<Omit<IEvent, "_id" | "__v">> {
  starting_date: Date;
  ending_date: Date;
}

export type TUpdateEventRes = ICreateEventResponse;

export interface IUpdateEventArgs extends ICreateEventArgs {
  id: string | number | undefined;
}

export interface IEventAction {
  row?: IEvent;
}

export interface IEventInitialValues
  extends Required<Omit<IEvent, "_id" | "__v">> {
  image: File | string;
  imageName?: string;
}
