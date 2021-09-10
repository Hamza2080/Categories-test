const NotFoundError = require("../../error/notFound.error");

const { Category } = require('./../../model/categories.model');
const { categoryHandler } = require('../../handlers/categories.handler');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

const categoryMockedResponse = require('../data/category.find.response.json');
const categoryMockedData = require('../data/category.find.data.json');

jest.setTimeout(30000);

describe('Category api handler function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Success - Get categories recursively successfully - 200', async () => {
    const categoryMockedData1 = JSON.parse(JSON.stringify(categoryMockedData));
    jest.spyOn(Category, 'find').mockImplementation(() => {
      return categoryMockedData1.map((item => ({
        toJSON: () => { return item },
        ...item
      })))
    });

    jest.spyOn(Category, 'findOne').mockImplementation((params) => {
      const categoryItem = categoryMockedData1.find(item => item.parent_id == params['parent_id']);
      if (!categoryItem) { return null }

      return {
        toJSON: () => { return categoryItem },
        ...categoryItem
      };
    });

    expect(await categoryHandler()).toEqual(categoryMockedResponse.categories);
  });

  it('Success - Get categories by id - 200', async () => {
    const categoryMockedData2 = JSON.parse(JSON.stringify(categoryMockedData));

    jest.spyOn(Category, 'find').mockImplementation((param) => {
      const categoryItem = categoryMockedData2.find(item => item._id == param['_id'])
      if (!categoryItem) { return null }

      return [{
        toJSON: () => { return categoryItem },
        ...categoryItem
      }];
    });

    jest.spyOn(Category, 'findOne').mockImplementation((params) => {
      const categoryItem = categoryMockedData2.find(item => item.parent_id == params['parent_id']);
      if (!categoryItem) { return null }

      return {
        toJSON: () => { return categoryItem },
        ...categoryItem
      };
    });

    const id = '8';
    expect(await categoryHandler(id)).toEqual(categoryMockedResponse.categoryById);
  });

  it('Error - throw 404 - listing not found against id', async () => {
    jest.spyOn(Category, 'find').mockImplementation((param) => {
      return [];
    });

    const id = '8';
    await expect(categoryHandler(id)).rejects.toThrowError('listing not found:8');
  });

  it('Error - throw 404 - listing not found against id', async () => {
    jest.spyOn(Category, 'find').mockImplementation((param) => {
      return [];
    });

    const id = {};
    await expect(categoryHandler(id)).rejects.toThrowError('not a valid query param type');
  });
});