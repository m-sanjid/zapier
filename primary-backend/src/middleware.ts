import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

// Define the structure of your JWT payload
interface JWTPayload {
  id: number;
}

// Extend Express's Request type to include your custom properties
declare global {
  namespace Express {
    interface Request {
      id: number;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({
      message: "No token provided or invalid token format",
    });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify and decode the JWT
    const decoded = jwt.verify(token, JWT_PASSWORD) as JWTPayload;

    // Add the user id to the request object
    req.id = decoded.id;

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({
        message: "Invalid token",
      });
      return;
    }

    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};
