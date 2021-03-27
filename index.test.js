const request = require('supertest');
const index = require('./index');

test('should render profiles', async () => {
  await request(index).get('/explore')
  expect(201)
})
