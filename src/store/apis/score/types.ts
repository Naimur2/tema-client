export interface IScoreResponse {
  message: string;
  data: Daum[];
}


export interface IScoreGetRequest {
  teamId: string;
  eventId: string;
}

export interface IScoreUpdateRequest extends IScoreGetRequest {
    score: number;
}



export interface Daum {
  _id: string;
  team: Team;
  score: number;
  event: Event;
  __v: number;
}

export interface Team {
  _id: string;
  name: string;
  color: string;
  score: number;
  __v: number;
  image: string;
}

export interface Event {
  _id: string;
  name: string;
  team_id: string;
  starting_date: string;
  ending_date: string;
  image: string;
  location: string;
  __v: number;
}
