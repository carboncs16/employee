const logger = require('./logger');

const requestLogger = (req, _, next) => {
    const options = {
        ip: req.ip,
        body: req.body,
        url: req.url
    };
    logger.info(options);
    next();
};

module.exports = requestLogger;
