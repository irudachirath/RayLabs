jest.mock("../config/firebase", () => require("../__mocks__/firebase"));

// Mocking bcrypt
jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

// Mocking jsonwebtoken
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("checkUserExists userService", () => {
  const { firestore } = require("../config/firebase");
  const { checkUserExists } = require("../services/userServices");

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return false if no user exists with the given email", async () => {
    // Mock snapshot to be empty
    firestore().collection().where().get.mockResolvedValue({
      empty: true,
    });

    const result = await checkUserExists("nonexistent@example.com");

    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(firestore().collection().where).toHaveBeenCalledWith(
      "email",
      "==",
      "nonexistent@example.com"
    );
    expect(firestore().collection().where().get).toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it("should return true if a user exists with the given email", async () => {
    // Mock snapshot to have data
    firestore().collection().where().get.mockResolvedValue({
      empty: false,
    });

    const result = await checkUserExists("existing@example.com");

    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(firestore().collection().where).toHaveBeenCalledWith(
      "email",
      "==",
      "existing@example.com"
    );
    expect(firestore().collection().where().get).toHaveBeenCalled();
    expect(result).toBe(true);
  });

  it("should throw an error if Firestore throws an error", async () => {
    // Mock Firestore to throw an error
    firestore()
      .collection()
      .where()
      .get.mockRejectedValue(new Error("Firestore error"));

    await expect(checkUserExists("error@example.com")).rejects.toThrow(
      "Firestore error"
    );

    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(firestore().collection().where).toHaveBeenCalledWith(
      "email",
      "==",
      "error@example.com"
    );
    expect(firestore().collection().where().get).toHaveBeenCalled();
  });
});

describe("createUser userService", () => {
  const { createUser } = require("../services/userServices");
  const { firestore } = require("../config/firebase");
  const bcrypt = require("bcryptjs");
  const jwt = require("jsonwebtoken");

  const userData = {
    name: "John Doe",
    gender: "Male",
    email: "john.doe@example.com",
    password: "123456",
  };

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should create a new user and return a JWT token", async () => {
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedPassword");
    firestore().collection().add.mockResolvedValue({ id: "userId123" }); // Correct the method call
    jwt.sign.mockReturnValue("jwtToken123"); // Simulate JWT token generation

    const result = await createUser(userData);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, "salt");
    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(firestore().collection().add).toHaveBeenCalledWith({
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
      hashedPassword: "hashedPassword",
      reportIds: [],
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      { user: { id: "userId123" } },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );
    expect(result).toEqual({ token: "jwtToken123" });
  });

  it("should handle errors when database operations fail", async () => {
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedPassword");
    firestore()
      .collection()
      .add.mockRejectedValue(new Error("Firestore failed"));

    await expect(createUser(userData)).rejects.toThrow(
      "Failed to create user."
    );

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, "salt");
    expect(firestore().collection).toHaveBeenCalledWith("users");
  });

  it("should handle errors when JWT token generation fails", async () => {
    bcrypt.genSalt.mockResolvedValue("salt");
    bcrypt.hash.mockResolvedValue("hashedPassword");
    firestore().collection().add.mockResolvedValue({ id: "userId123" });
    jwt.sign.mockImplementation(() => {
      throw new Error("JWT Error");
    });

    await expect(createUser(userData)).rejects.toThrow(
      "Failed to create user."
    );

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, "salt");
    expect(firestore().collection).toHaveBeenCalledWith("users");
    expect(firestore().collection().add).toHaveBeenCalledWith({
      name: userData.name,
      gender: userData.gender,
      email: userData.email,
      hashedPassword: "hashedPassword",
      reportIds: [],
    });
  });
});
