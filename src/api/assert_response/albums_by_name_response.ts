import { AssertResponse } from "./assert_response";
import { Album } from "../../model/album";

export class AlbumsByNameResponse extends AssertResponse {

    constructor(albums: Array<Album>) {
        super(200, JSON.stringify(albums.forEach(album => album.toJson())));
    }
}