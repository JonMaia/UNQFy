import { AssertResponse } from "./assert_response";
import { Album } from "../../model/album";

export class AddAlbumToUnqfyResponse extends AssertResponse {

    constructor(album: Album) {
        super(201, JSON.stringify(album.toJson()));
    }
}