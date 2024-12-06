import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true }, //comprehension, cloze, categorize
  questionText: { type: String, required: true },
  passage: { type: String },
  subQuestions: [
    {
      questionText: { type: String, required: true },
    },
  ],
  options: [String],
  image: String,
});

const formSchema = new mongoose.Schema({
  headerImage: String,
  questions: [questionSchema],
});
export const Form = mongoose.model("Form", formSchema);

//response schema

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  answers: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
      },
      answer: mongoose.Schema.Types.Mixed,
      subAnswers: [
        // For comprehension sub-questions
        {
          subQuestionId: { type: mongoose.Schema.Types.ObjectId },
          answer: mongoose.Schema.Types.Mixed, // User-provided sub-answer
        },
      ],
    },
  ],
});

export const Response = mongoose.model("Response", responseSchema);
