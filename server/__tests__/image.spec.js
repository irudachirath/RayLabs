// image.spec.js Test File

const { uploadImage } = require("../services/imageServices"); // Adjust path as necessary
jest.mock("../config/firebase", () => require("../__mocks__/firebase"));
const firebase = require("../config/firebase");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("uploadImage", () => {
  it("should upload an image and return a signed URL", async () => {
    firebase
      .firestore()
      .collection()
      .doc()
      .get.mockResolvedValue({
        exists: true,
        data: () => ({ name: "John Doe" }),
      });

    const filePath = "path/to/local/image.jpg";
    const fileName = "image.jpg";
    const userId = "user123";

    const signedUrl = await uploadImage(filePath, fileName, userId); // Update function if needed to accept bucketName

    expect(firebase.firestore().collection().doc).toHaveBeenCalledWith(userId);
    expect(firebase.firestore().collection().doc().get).toHaveBeenCalled();
    expect(firebase.storage().bucket().upload).toHaveBeenCalledWith(filePath, {
      destination: `images/John Doe_user123/${fileName}`,
    });
    expect(firebase.storage().bucket().file).toHaveBeenCalledWith(
      `images/John Doe_user123/${fileName}`
    );
    expect(
      firebase.storage().bucket().file().getSignedUrl
    ).toHaveBeenCalledWith({
      action: "read",
      expires: "03-09-2491",
    });
    expect(signedUrl).toBe("http://example.com/signedUrl");
  });

  it("should throw an error if the user does not exist", async () => {
    firebase.firestore().collection().doc().get.mockResolvedValue({
      exists: false,
    });

    const filePath = "path/to/local/image.jpg";
    const fileName = "image.jpg";
    const userId = "nonexistent-user";

    await expect(uploadImage(filePath, fileName, userId)).rejects.toThrow(
      "User not found"
    );

    expect(firebase.storage().bucket().upload).not.toHaveBeenCalled();
  });
});
