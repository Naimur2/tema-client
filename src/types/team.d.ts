export interface ITeam {
  _id?: string;
  name?: string;
  color?: string;
  score?: number;
  __v?: number;
  image?: string;
}

export interface ITeamsData {
  message?: string;
  data?: ITeam[];
}

export interface ITeamData extends ITeamsData {
  data?: ITeam;
}

export type TTeamDataArg = string | number | undefined;

export interface ITeamInitialValues
  extends Required<Omit<ITeam, "_id" | "__v">> {
  image: undefined | File | string;
}

export interface ICreateTeamRes extends ITeamsData {
  data?: ITeam;
}

export type TCreateTeamArgs = ITeamInitialValues;

export interface IUpdateTeamRes extends ITeamsData {
  data?: ITeam;
}

export interface IUpdateTeamArgs extends Required<Omit<ITeam, "_id" | "__v">> {
  id: string | number | undefined;
}

export type TDeleteTeamArg = string | number | undefined;

export interface IDeleteTeamResponse {
  message?: string;
}

export interface ITeamAction {
  row?: ITeam;
}
