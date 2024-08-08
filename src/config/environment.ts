import * as process from 'process';

export default () => ({
  env: process.env.ENVIRONMENT,
  databases: {
    main: 'characterization',
    secondary: '',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'toor',
  },
});
