export interface IError extends Error {
    message: string;
    status: number;
}