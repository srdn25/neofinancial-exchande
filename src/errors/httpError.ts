import { IError } from '../interfaces/IError';

export default class HttpError extends Error implements IError {
    public status: number;
    public message: string;
    public name: string;

    constructor(status: number, message: string) {
        super(message);
        this.message = message;
        this.status = status;
    }
}