import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import { prismaClient } from "../db";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

// Define custom interface for authenticated request
interface AuthenticatedRequest extends Request {
  id: number; // Change to number since Prisma typically uses number for IDs
}

const router = Router();

router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const parsedData = SignupSchema.safeParse(body);

  if (!parsedData.success) {
    console.log(parsedData.error);
    res.status(411).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const userExists = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
    },
  });

  if (userExists) {
    res.status(403).json({
      message: "User already exists",
    });
    return;
  }

  await prismaClient.user.create({
    data: {
      email: parsedData.data.username,
      password: parsedData.data.password,
      name: parsedData.data.name,
    },
  });

  res.json({
    message: "Please verify your account by checking your email",
  });
});

router.post("/signin", async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Incorrect inputs",
    });
    return;
  }

  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      message: "Sorry credentials are incorrect",
    });
    return;
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    JWT_PASSWORD,
  );

  res.json({
    token: token,
  });
});

router.get(
  "/",
  authMiddleware,
  async (req: Request, res: Response): Promise<void> => {
    const authenticatedReq = req as AuthenticatedRequest;
    const id = authenticatedReq.id;

    const user = await prismaClient.user.findFirst({
      where: {
        id: id, // Now id will be correctly typed as a number
      },
      select: {
        name: true,
        email: true,
      },
    });

    res.json({
      user,
    });
  },
);

export const userRouter = router;
