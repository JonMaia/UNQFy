import { ErrorResponse } from "./error_response";


export class ResourceAlreadyExists extends ErrorResponse {

    constructor() {
        super(409, "RESOURCE_ALREADY_EXISTS");
    }
}