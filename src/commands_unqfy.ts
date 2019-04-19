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
                .help();
