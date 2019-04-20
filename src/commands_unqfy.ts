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
                .command('getArtist', 'Busca y devuelve los artistas que coincidan con el nombre pasado. Permite búsqueda parcial ', {
                    name: {
                        demand: false,
                        alias: 'n',
                        desc: 'Nombre parcial o completo del artista',
                        default: ''
                    }
                })
                .example("$0 getArtist")
                .help();
