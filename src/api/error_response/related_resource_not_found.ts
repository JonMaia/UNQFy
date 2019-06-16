import { ErrorResponse } from "./error_response";


export class RelatedResourceNotFound extends ErrorResponse {

    constructor() {
        super(404, "RELATED_RESOURCE_NOT_FOUND");
    }
}