import { ErrorResponse } from "./error_response";

export class ResourceNotFoundResponse extends ErrorResponse {

    constructor() {
        super(404, "RESOURCE_NOT_FOUND");
    }
}