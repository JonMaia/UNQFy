ts-node src/main addArtist --name 'Artick Monkeys' --country 'Reino Unido'
ts-node src/main addArtist --name 'Michael Jackson' --country 'EEUU'

ts-node src/main addAlbum --artistId 0 --name 'AM' --year 2013
ts-node src/main addAlbum --artistId 0 --name 'Favourite Worst Nightmare' --year 2007
ts-node src/main addAlbum --artistId 1 --name 'Thriller' --year 1982

ts-node src/main addTrack --idAlbum 0 --name 'Do I Wanna Know?' --duration 274 --genres 'Rock'
ts-node src/main addTrack --idAlbum 0 --name 'R U Mine?' --duration 201 --genres 'Rock'
ts-node src/main addTrack --idAlbum 0 --name 'Knee Socks' --duration 206 --genres 'Rock'

ts-node src/main addTrack --idAlbum 1 --name 'Brianstorm' --duration 190 --genres 'Rock'
ts-node src/main addTrack --idAlbum 1 --name 'Fluorescent Adolescent' --duration 198 --genres 'Rock'
ts-node src/main addTrack --idAlbum 1 --name 'Teddy Picker' --duration 163 --genres 'Rock'

ts-node src/main addTrack --idAlbum 2 --name 'Thriller' --duration 358 --genres 'Pop'
ts-node src/main addTrack --idAlbum 2 --name 'Beat It' --duration 258 --genres 'Pop'
ts-node src/main addTrack --idAlbum 2 --name 'Billie Jean' --duration 296 --genres 'Pop'

ts-node src/main createPlaylist --name 'Un poco de Pop' --duration 900 --genres 'Pop'