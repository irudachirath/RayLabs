// Mocking jsonwebtoken
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth"); // Adjust path as necessary

// Mock Express request, response, and next
const mockRequest = (headers) => ({
  header: jest.fn().mockReturnValue(headers["x-auth-token"]),
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe("Auth Middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 401 if no token is provided", () => {
    const req = mockRequest({}); // No token
    const res = mockResponse();

    auth(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "No token, authorization denied",
    });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should return 401 if the token is invalid", () => {
    const req = mockRequest({ "x-auth-token": "invalid-token" });
    const res = mockResponse();

    // Mock jwt.verify to throw an error for an invalid token
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error("Token is not valid");
    });

    auth(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Token is not valid" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("should call next if the token is valid", () => {
    const req = mockRequest({ "x-auth-token": "valid-token" });
    const res = mockResponse();

    // Mock jwt.verify to return a decoded object
    jwt.verify = jest.fn().mockReturnValue({ user: { id: "user123" } });

    auth(req, res, mockNext);

    expect(jwt.verify).toHaveBeenCalledWith(
      "valid-token",
      process.env.JWT_SECRET
    );
    expect(req.user).toEqual({ id: "user123" });
    expect(mockNext).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
