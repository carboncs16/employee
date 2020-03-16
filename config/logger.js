const winston = require('winston');
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: 'info.log',
            level: 'info',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json())
        })
    ]
});

module.exports = logger;
