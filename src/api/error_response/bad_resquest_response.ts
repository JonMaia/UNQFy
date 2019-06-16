import { ErrorResponse } from "./error_response";

export class BadResquestResponse extends ErrorResponse {

    constructor() {
        super(400, "BAD_REQUEST");
    }
}