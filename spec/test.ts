const assert = require('chai').assert;
import {UNQfy} from '../src/unqfy';


function createAndAddArtist(unqfy: UNQfy, artistName: any, country: any) {
  const artist = unqfy.addArtist({ name: artistName, country });
  return artist;
}

function createAndAddAlbum(unqfy: UNQfy, artistId: number, albumName: string, albumYear: number) {
  return unqfy.addAlbum(artistId, { name: albumName, year: albumYear });
}

function createAndAddTrack(unqfy: UNQfy, albumName: string, trackName: string, trackDuraction: any, trackGenres: any) {
  return unqfy.addTrack(albumName, { name: trackName, duration: trackDuraction, genres: trackGenres });
}


describe('Add, remove and filter data', () => {
  let unqfy: UNQfy;

  beforeEach(() => {
    unqfy = new UNQfy();
  });

  it('should add an artist', () => {
    const artist: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');

    assert.equal(artist.name, 'Guns n\' Roses');
    assert.equal(artist.country, 'USA');

  });

  it('should add an album to an artist', () => {
    const artist: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album: any = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);

    assert.equal(album.name, 'Appetite for Destruction');
    assert.equal(album.year, 1987);
  });

  it('should add a track to an album', () => {
    const artist: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album: any = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const track: any = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);

    assert.equal(track.name, 'Welcome to the jungle');
    assert.strictEqual(track.duration, 200);
    assert.equal(track.genres.includes('rock'), true);
    assert.equal(track.genres.includes('hard rock'), true);
    assert.lengthOf(track.genres, 2);
  });

  it('should find different things by name', () => {
    const artist1: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1: any = createAndAddAlbum(unqfy, artist1.id, 'Roses Album', 1987);
    const track = createAndAddTrack(unqfy, album1.id, 'Roses track', 200, ['pop', 'movie']);
    const playlist = unqfy.createPlaylist('Roses playlist', ['pop'], 1400);

    const results: any = unqfy.searchByName('Roses');
    assert.deepEqual(results, {
      artists: [artist1],
      albums: [album1],
      tracks: [track],
      playlists: [playlist],
    });
  });

  it('should get all tracks matching genres', () => {
    const artist1: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album1: any = createAndAddAlbum(unqfy, artist1.id, 'Appetite for Destruction', 1987);
    const t0: any = createAndAddTrack(unqfy, album1.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    const t1: any = createAndAddTrack(unqfy, album1.id, 'Sweet Child o\' Mine', 500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2: any = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2: any = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Trhiller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['classic']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['movie']);

    const tracksMatching: any = unqfy.getTracksMatchingGenres(['pop', 'movie']);

    // assert.equal(tracks.matching.constructor.name, Array);
    assert.isArray(tracksMatching);
    assert.lengthOf(tracksMatching, 4);
    assert.equal(tracksMatching.includes(t0), true);
    assert.equal(tracksMatching.includes(t1), true);
    assert.equal(tracksMatching.includes(t2), true);
    assert.equal(tracksMatching.includes(t3), true);
  });

  it('should get all tracks matching artist', () => {
    const artist: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album: any = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock']);
    const t2 = createAndAddTrack(unqfy, album.id, 'It\'s so easy', 200, ['rock', 'hard rock']);

    const album2: any = createAndAddAlbum(unqfy, artist.id, 'Use Your Illusion I', 1992);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Don\'t Cry', 500, ['rock', 'hard rock']);

    const artist2: any = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album3: any = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    createAndAddTrack(unqfy, album3.id, 'Thriller', 200, ['pop', 'movie']);
    createAndAddTrack(unqfy, album3.id, 'Another song', 500, ['classic']);
    createAndAddTrack(unqfy, album3.id, 'Another song II', 500, ['movie']);

    const matchingTracks: any = unqfy.getTracksMatchingArtist(artist);

    assert.isArray(matchingTracks);
    assert.lengthOf(matchingTracks, 3);
    assert.isTrue(matchingTracks.includes(t1));
    assert.isTrue(matchingTracks.includes(t2));
    assert.isTrue(matchingTracks.includes(t3));
  });
});

describe('Playlist Creation and properties', () => {
  let unqfy: UNQfy;

  beforeEach(() => {
    unqfy = new UNQfy();
  });

  it('should create a playlist as requested', () => {
    const artist: any = createAndAddArtist(unqfy, 'Guns n\' Roses', 'USA');
    const album: any = createAndAddAlbum(unqfy, artist.id, 'Appetite for Destruction', 1987);
    const t1 = createAndAddTrack(unqfy, album.id, 'Welcome to the jungle', 200, ['rock', 'hard rock', 'movie']);
    createAndAddTrack(unqfy, album.id, 'Sweet Child o\' Mine', 1500, ['rock', 'hard rock', 'pop', 'movie']);

    const artist2: any = createAndAddArtist(unqfy, 'Michael Jackson', 'USA');
    const album2: any = createAndAddAlbum(unqfy, artist2.id, 'Thriller', 1987);
    const t2 = createAndAddTrack(unqfy, album2.id, 'Thriller', 200, ['pop', 'movie']);
    const t3 = createAndAddTrack(unqfy, album2.id, 'Another song', 500, ['pop']);
    const t4 = createAndAddTrack(unqfy, album2.id, 'Another song II', 500, ['pop']);

    const playlist:any = unqfy.createPlaylist('my playlist', ['pop', 'rock'], 1400);

    assert.equal(playlist.name, 'my playlist');
    assert.isAtMost(playlist.duration(), 1400);
    assert.isTrue(playlist.hasTrack(t1));
    assert.isTrue(playlist.hasTrack(t2));
    assert.isTrue(playlist.hasTrack(t3));
    assert.isTrue(playlist.hasTrack(t4));
    assert.lengthOf(playlist.tracks, 4);
  });
});
