const { registerUser } = require("../../controllers/registerController");
const { loginUser } = require("../../controllers/loginController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/userModel");

// Mock dependencies
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../../models/userModel");

// Register Unit Test
describe("registerUser function", () => {
  it("should register a user successfully", async () => {
    // Mock request and response objects
    const req = {
      body: { email: "test@example.com", password: "testpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return null (user doesn't exist)
    User.findOne.mockResolvedValue(null);

    // Mock bcrypt.hash to return the hashed password
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock User constructor and save method
    const saveMock = jest.fn().mockResolvedValueOnce();
    jest.spyOn(User.prototype, "save").mockImplementationOnce(saveMock);
    // Mock jwt.sign to return a token
    jwt.sign.mockReturnValue("fakeToken");

    // Call the registerUser function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "User registered successfully",
      token: expect.any(String),
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.hash).toHaveBeenCalledWith("testpassword", 10);
    expect(User).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "hashedPassword",
    });
    expect(saveMock).toHaveBeenCalled();
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: expect.any(String) },
      "your-secret-key",
      { expiresIn: "1h" }
    );
  });

  it("should respond with a 400 status if user already exists", async () => {
    // Mock request and response objects
    const req = {
      body: { email: "test@example.com", password: "testpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return an existing user
    User.findOne.mockResolvedValue({});

    // Call the registerUser function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email already registered",
    });
  });

  it("should respond with a 500 status on error", async () => {
    // Mock request and response objects
    const req = {
      body: { email: "test@example.com", password: "testpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to throw an error
    User.findOne.mockRejectedValue(new Error("Database error"));

    // Call the registerUser function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "An error occurred" });
  });
});

describe("loginUser function", () => {
  it("should login a user successfully", async () => {
    // Mock request and response objects
    const req = {
      body: { email: "test@example.com", password: "testpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return a user
    const mockUser = {
      _id: "userId123",
      email: "test@example.com",
      password: "hashedPassword",
    };
    User.findOne.mockResolvedValue(mockUser);

    // Mock bcrypt.compare to return true
    bcrypt.compare.mockResolvedValue(true);

    // Mock jwt.sign to return a token
    jwt.sign.mockReturnValue("fakeToken");

    // Call the loginUser function
    await loginUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successful",
      token: "fakeToken",
    });

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "testpassword",
      "hashedPassword"
    );
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: "userId123" },
      "your-secret-key",
      { expiresIn: "1h" }
    );
  });

  it("should respond with a 400 status if user already exists", async () => {
    // Mock request and response objects
    const req = {
      body: { email: "test@example.com", password: "testpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to return an existing user
    User.findOne.mockResolvedValue({});

    // Call the registerUser function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Email already registered",
    });
  });

  it("should respond with a 500 status on error", async () => {
    // Mock request and response objects
    const req = {
      body: { email: "test@example.com", password: "testpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to throw an error
    User.findOne.mockRejectedValue(new Error("Database error"));

    // Call the registerUser function
    await registerUser(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "An error occurred" });
  });
});
