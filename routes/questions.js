const express = require("express");
const router = express.Router();
const {
  getAllQuestions,
  createQuestion,
  getOneQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controller/questions");

router.route("/questions").get(getAllQuestions).post(createQuestion);
router
  .route("/questions/:id")
  .get(getOneQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

module.exports = router;
