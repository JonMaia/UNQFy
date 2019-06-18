import { AssertResponse } from "./assert_response";
import { Album } from "../../model/album";

export class DeleteAlbumCorrectlyResponse extends AssertResponse {

    constructor() {
        super(204, 'El album ha sido eliminado correctamente');
    }
}