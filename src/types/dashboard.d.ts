export interface IDetailsCard {
  title: string;
  value: number;
  icon?: any;
}

export interface IStatistic {
  totalUsers?: number;
  totalEvents?: number;
  totalTeams?: number;
}

export interface IDashBoardData {
  message?: string;
  data?: IStatistic;
}

/* assign event start */
export interface IAssignTeamArgs {
  id: string;
  data: {
    teamId: string;
  };
}

export interface IAssignTeamRes {
  message?: string;
}
/* assign event end */
