import { Router } from "express";
import { authMiddleware } from "../middleware";
import { ZapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  const body = req.body;
  const parsedData = ZapCreateSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(403).json({
      message: "Incorrect inputs",
    });
  }

  await prismaClient.$transaction(async (tx) => {
    const zap = await prismaClient.zap.create({
      data: {
        triggerId: "",
        actions: {
          create: parsedData.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
          })),
        },
      },
    });
    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });
    await prismaClient.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });
  });
});
router.get("/", authMiddleware, (req, res) => {
  console.log("createZap");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  console.log("xap");
});

export const zapRouter = router;
