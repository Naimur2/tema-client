export interface IUser {
    _id: string;
    email: string;
    name: string;
    role: "user" | "admin" | "superadmin";
    hasVerifiedEmail: boolean;
}

export interface IAuthState {
    user: IUser | null;
    token: string | null;
    refreshToken?: string | null;
}
