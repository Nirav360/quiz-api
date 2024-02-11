const Question = require("../models/question");

const getAllQuestions = async (req, res) => {
  try {
    const data = await Question.find();
    if (!data) {
      return res.status(400).json({ message: "No questions found" });
    }
    return res
      .status(200)
      .json({ totalQuestions: data.length, questions: data });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const createQuestion = async (req, res) => {
  try {
    const { question, choices, correctAnswer } = req.body;
    if (
      !question ||
      !choices ||
      !correctAnswer ||
      !Array.isArray(choices) ||
      !choices.length
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const questionObject = { question, choices, correctAnswer };
    const questionCreate = await Question.create(questionObject);
    if (questionCreate) {
      return res.status(201).json({ message: "Question Added Successfully" });
    } else {
      return res.status(400).json({ message: "Invalid question" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const getOneQuestion = async (req, res) => {
  try {
    const id = req.params.id;

    const question = await Question.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    } else {
      return res.status(200).json(question);
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const { question, choices, correctAnswer } = req.body;

    if (
      !id ||
      !question ||
      !choices ||
      !correctAnswer ||
      !Array.isArray(choices) ||
      !choices.length
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, choices, correctAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    } else {
      return res.status(200).json({ message: "Question updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Id is required" });
    }
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    } else {
      return res.status(200).json({ message: "Question deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getAllQuestions,
  createQuestion,
  getOneQuestion,
  updateQuestion,
  deleteQuestion,
};
