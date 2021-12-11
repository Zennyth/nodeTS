import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
// const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER as Dialect
const dbPassword = process.env.DB_PASSWORD as string

const isDev = process.env.NODE_ENV === 'development';

let sequelizeConnection: Sequelize;
if (!isDev) {
  sequelizeConnection = new Sequelize(
    dbName, 
    dbUser, 
    dbPassword,
    {
      dialect: dbDriver,
    }
  );
} else {
  sequelizeConnection = new Sequelize(
    {
      dialect: "sqlite",
      storage: './src/db/storage/database.sqlite',
      logging: false
    }
  );
}


export default sequelizeConnection;