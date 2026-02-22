const env = process.env.TEST_ENV || 'dev';

const config = {
  dev: require('./env.dev'),
  qa: require('./env.qa')
};

module.exports = config[env];