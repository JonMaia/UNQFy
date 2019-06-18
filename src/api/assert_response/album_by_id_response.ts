import { AssertResponse } from "./assert_response";
import { Album } from "../../model/album";

export class AlbumByIdResponse extends AssertResponse {

    constructor(album: Album) {
        super(200, JSON.stringify(album.toJson()));
    }
}