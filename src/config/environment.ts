import * as process from 'process';

export default () => ({
  env: process.env.ENVIRONMENT,
  databases: {
    // main: 'characterization',
    // secondary: '',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'toor',
    main: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    // main: 'db-salud-puerto-salgar.c4liyws6czur.us-east-1.rds.amazonaws.com',
    // host: 'characterization_db',
    // port: 3306,
    // username: 'admin',
    // password: 'Salud2025Db!',
  },
});
