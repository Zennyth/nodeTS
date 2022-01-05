## Docker

### Build image
> docker build --tag api-simulation .
### Run container
> docker run -p 3000:3000 --rm -v $pwd/.env.simulation:/usr/src/app/api/.env api-simulation

