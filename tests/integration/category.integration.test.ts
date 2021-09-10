const axios = require('axios');
const categoryFindE2EMockedData = require('../data/category.find.E2E.data.json');
const categoryFindByIdE2EMockedData = require('../data/category.find-by-id.E2E.data.json');

jest.setTimeout(30000);

describe('Category api handler function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Success - Get categories recursively - 200', async () => {
    const response = await axios.get('http://localhost:3003/api/categories');
    expect(response.status).toBe(200);

    expect(response.data).toEqual(categoryFindE2EMockedData);
  });

  it('Success - Get category by id - 200', async () => {
    const response = await axios.get('http://localhost:3003/api/categories?id=8');
    expect(response.status).toBe(200);

    expect(response.data).toEqual(categoryFindByIdE2EMockedData);
  });

  it('Error - listing id not found - 404', async () => {
    try {
      await axios.get('http://localhost:3003/api/categories?id=11');
    } catch (error) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toBe('listing not found:11');
    }
  });

  it('Error - listing id is not valid - 400', async () => {
    try {
      await axios.get('http://localhost:3003/api/categories?id=88y');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe('not a valid query param type');
    }
  });

});