export interface IForgotPassBody {
    email: string;
    password: string;
    confirmPassword: string;
    otpToken: string;
}
export interface ILoginBody {
    email: string;
    password: string;
    confirmPassword: string;
    otpToken: string;
}
