import { Router } from "express";
import { authMiddleware } from "../middleware";

const router = Router();

router.post("/", authMiddleware, (req, res) => {
  console.log("createZap");
});
router.get("/", authMiddleware, (req, res) => {
  console.log("createZap");
});

router.get("/:zapId", authMiddleware, (req, res) => {
  console.log("xap");
});

export const zapRouter = router;
