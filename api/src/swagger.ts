const initSwagger = (app, port) => {
  const options = {
    swaggerDefinition: {
      info: {
        description: 'WebServer for the simulation',
        title: 'API - Simulator',
        version: '1.0.0',
      },
      host: `localhost:${port}`,
      basePath: '',
      produces: [
        "application/json"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
        bearerAuth: {
          name: "x-access-token",
          type: 'apiKey',
          scheme: 'bearer',
          in: 'header',
        }
      },
      security: [ { bearerAuth: [] } ],
    },
    basedir: __dirname, //app absolute path
    files: ['./db/**/*.ts', './controllers/**/*.ts'] //Path to the API handle folder
  };
  const expressSwagger = require('express-swagger-generator')(app);
  expressSwagger(options);
}

export{
  initSwagger
}