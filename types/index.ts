export interface WindowSize {
    width: number;
    height: number;
}

export interface IUser {
    _id?: string;
    email: string;
    fullName: string;
    result: string;
}

export interface LoginUserParams {
    email: string;
    password: string;
}