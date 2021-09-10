# Categories-test

### Running server
npm run start OR node .

### Seeding data in mongoDB on port 27017
npm run seed

### Unit test
npm run test

### Unit test with coverage
npm run test:coverage

### Integration test
npm run test:integration
For integration test, first run
docker-compose up command, this command will up the server and mongodb in container and also seed dummy json data in mongoDB.
then our integration tests hit endpoint of our servers in container
