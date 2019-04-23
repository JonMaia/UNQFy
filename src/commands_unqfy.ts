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
                    name: {
                        demand: true,
                        alias: 'n',
                        desc: 'Nombre del artista'
                    }
                })
                .example("$0 deleteArtist --name 'test'")
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
                    }
                })
                .example("$0 getAlbum")
                .command('addAlbum', 'Crea un nuevo Album', {
                    artist: {
                        demand: true,
                        alias: 'a',
                        desc: 'Nombre del artista'
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
                .example("$0 addAlbum --artist 'test' --name 'test' --year '2019'")
                .command('deleteAlbum', 
                'Elimina un artista junto a sus albumes y tracks. Los tracks también son eliminados de los playlist', {
                name: {
                    demand: true,
                    alias: 'n',
                    desc: 'Nombre del artista'
                }
                })

            .example("$0 deleteArtist --name 'test'")
                .help();
