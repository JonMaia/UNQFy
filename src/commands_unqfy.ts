export const {argv} = require('yargs')
                .command('addArtist', 'Crea un nuevo artista', {
                    name: {
                        demand: true,
                        alias: 'n',
                        desc: 'Nombre del artista'
                    },
                    country: {
                        demand: true,
                        alias: 'c',
                        desc: 'País del artista'
                    }
                })
                .example("$0 addArtist --help")
                .example("$0 addArtist --name 'test' --country 'ARG'")
                .command('deleteArtist', 
                    'Elimina un artista junto a sus albumes y tracks. Los tracks también son eliminados de los playlist', {
                    id: {
                        demand: true,
                        alias: 'i',
                        desc: 'Id del artista'
                    }
                })
                .example("$0 deleteArtist --id 10 ")
                .command('getArtist', 'Busca y devuelve los artistas que coincidan con el id o nombre pasado. Permite búsqueda parcial ', {
                    name: {
                        demand: false,
                        alias: 'n',
                        desc: 'Nombre parcial o completo del artista',
                        default: ''
                    },
                    id: {
                        demand: false,
                        alias: 'i',
                        desc: 'Id del artista',
                        default: '-1'
                    }
                })
                .example("$0 getArtist")
                .command('getAlbum', 'Busca y devuelve los album que coincidan con el nombre pasado. Permite búsqueda parcial ', {
                    name: {
                        demand: false,
                        alias: 'n',
                        desc: 'Nombre parcial o completo del album',
                        default: ''
                    },
                    id: {
                        demand: false,
                        alias: 'i',
                        desc: 'Id del album',
                        default: '-1'
                    }
                })
                .example("$0 getAlbum")
                .command('addAlbum', 'Crea un nuevo Album', {
                    artistId: {
                        demand: true,
                        alias: 'a',
                        desc: 'id del artista'
                    },
                
                    name: {
                        demand: true,
                        alias: 'n',
                        desc: 'Nombre del album'
                    },
                    year: {
                        demand: true,
                        alias: 'y',
                        desc: 'añoDelAlbum'
                    }
                })
                .example("$0 addAlbum --help")
                .example("$0 addAlbum --artist 1 --name 'test' --year '2019'")
                .command('deleteAlbum', 
                'Elimina un album junto a sus tracks. Los tracks también son eliminados de los playlist', {
                    id: {
                        demand: true,
                        alias: 'i',
                        desc: 'id del album'
                    }
                })
                .example("$0 deleteAlbum --id 29")

                .command('addTrack', 'Crea un nuevo track', {
                    name: {
                        demand: true,
                        alias: 'n',
                        desc: 'Nombre del track'
                    },
                    duration: {
                        demand: true,
                        alias: 'd',
                        desc: 'Duracion de la canción (en segundos)'
                    },
                    genres: {
                        demand: true,
                        alias: 'g',
                        desc: 'Los generos del track'
                    },
                    idAlbum: {
                        demand: true,
                        alias: 'a',
                        desc: 'Id del albúm al que pertenece el track'
                    }
                })
                .example("$0 addTrack --help")
                .example("$0 addTrack --name 'test' --duration 10 --genres 'Rock, Metal'")
                .command('deleteTrack', 
                    'Elimina un track del album y de la playlist', {
                    id: {
                        demand: true,
                        alias: 'i',
                        desc: 'Id del Track'
                    }
                })
                .example("$0 deleteTrack --id 10 ")
                .command('getTrack', 'Busca y devuelve los Track que coincidan con el id o nombre pasado. Permite búsqueda parcial ', {
                    name: {
                        demand: false,
                        alias: 'n',
                        desc: 'Nombre parcial o completo del Track',
                        default: ''
                    },
                    id: {
                        demand: false,
                        alias: 'i',
                        desc: 'Id del Track',
                        default: '-1'
                    }
                })
                .example("$0 getTrack")
                .example("$0 deleteArtist --name 'test'")
                .command('searchByName', 'Busca y devuelve los artistas, albums, tracks y playlists que coincidan con el nombre pasado. Permite búsqueda parcial ', {
                    name: {
                        demand: false,
                        alias: 'n',
                        desc: 'Nombre parcial o completo',
                        default: ''
                    }
                })
                .help();
            