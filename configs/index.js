
const path = require('path')
const dotenv = require('dotenv')

const envFilename = process.env.ENV_FILENAME || ''
const envPath = path.resolve(__dirname, `${envFilename}.env`)
const defaultEnvPath = path.resolve(__dirname, 'default.env')

// load system env -> .env -> default.env
dotenv.config({ path: envPath });
dotenv.config({ path: defaultEnvPath });

module.exports = {
  envPath,
  defaultEnvPath,
}
