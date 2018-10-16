const nodeEnv = process.env.NODE_ENV || 'local';

module.exports = require(`./config.${nodeEnv}`);
