import { Router } from "express";
const router = Router();
import {
  getThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} from "../../controllers/thoughtController.js";

router.route("/").get(getThoughts).post(createThought);

router
  .route("/:thoughts")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").get(addReaction);

router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

export default router;