export var winston = require('winston');
var {Loggly} = require('winston-loggly-bulk');
winston.add(new Loggly({
    token: "12eb8b32-7e8d-4dc8-9383-653f5d54082b",
    subdomain: "perezcesar",
    tags: ["Winston-NodeJS"],
 json: true
}));

     