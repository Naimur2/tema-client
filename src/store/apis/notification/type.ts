export interface IPagination {
    page: number;
    limit: number;
}
export interface IMeta extends IPagination {
    total: number;
}

export interface INotification {
    _id: string;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface INotificationResponse {
    data: INotification[];
    message: string;
    meta: IMeta;
}
