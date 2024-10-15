// __mocks__/firebase.js

const mockAdd = jest.fn();
const mockUpdate = jest.fn();
const mockGet = jest.fn();
const mockDelete = jest.fn();
const mockWhere = jest.fn().mockReturnValue({
  get: mockGet,
});
const mockDoc = jest.fn(() => ({
  get: mockGet,
  update: mockUpdate,
  delete: mockDelete,
}));
const mockCollection = jest.fn(() => ({
  doc: mockDoc,
  add: mockAdd,
  where: mockWhere,
  get: mockGet,
}));

class MockFieldValue {
  static arrayUnion = jest.fn((id) => [id]); // Mock implementation
  static arrayRemove = jest.fn((id) => [id]); // Mock implementation
}

const mockFileDelete = jest.fn();

const mockGetSignedUrl = jest
  .fn()
  .mockResolvedValue(["http://example.com/signedUrl"]);
const mockUpload = jest
  .fn()
  .mockResolvedValue([{ mediaLink: "http://example.com/media" }]);

const mockFile = jest.fn(() => ({
  getSignedUrl: mockGetSignedUrl,
  delete: mockFileDelete,
}));

const mockBucket = jest.fn(() => ({
  upload: mockUpload,
  file: mockFile,
}));

const firebase = {
  firestore: jest.fn(() => ({
    collection: mockCollection,
    FieldValue: MockFieldValue,
  })),
  storage: jest.fn(() => ({
    bucket: mockBucket,
  })),
};

module.exports = firebase;
