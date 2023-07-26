export interface INotificationInitialValues {
  title: string;
  message: string;
}

export type TCreateNotificationArgs = INotificationInitialValues;

export interface ICreateNotificationRes{
    message?: string;
    data: Partial<INotificationInitialValues> & {
        _id?: string;
        __v?: number;
      }
}