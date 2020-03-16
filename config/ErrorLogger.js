const logger = require('./logger');

const errorLogger = (err, req, res, next) => {
    const options = {
        error: err,
        ip: req.ip,
        body: req.body,
        url: req.url
    };
    logger.error(options);
    res.status(400).send(err);
    next();
};

module.exports = errorLogger;
