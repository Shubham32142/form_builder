import React, { useState } from "react";
import axios from "axios";
import { FormPreview } from "./FormPreview";
import { createForm } from "../services/api"; // Assuming your API endpoint is correct

export function FormBuilder() {
  const [form, setForm] = useState({ headerImage: "", questions: [] });
  const [message, setMessage] = useState("");

  // Add a new question
  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        {
          type: "",
          questionText: "",
          passage: "",
          subQuestions: [],
          options: [],
        },
      ],
    });
  };

  // Handle saving the form
  const handleSave = async (form) => {
    try {
      const response = await axios.post(createForm, form);
      alert(
        `Form created successfully!`
      );
      setMessage("Form saved successfully!");
      console.log("Form saved successfully:", response.data);
    } catch (error) {
      setMessage("Error saving form. Please try again.");
      console.error("Error saving form:", error.message);
    }
  };

  // Handle question type changes
  const handleQuestionTypeChange = (index, type) => {
    setForm({
      ...form,
      questions: form.questions.map((question, i) =>
        i === index ? { ...question, type } : question
      ),
    });
  };

  // Handle passage text changes (for comprehension questions)
  const handlePassageChange = (index, passageText) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index].passage = passageText;
    setForm({
      ...form,
      questions: updatedQuestions,
    });
  };

  // Add a sub-question for comprehension questions
  const addSubQuestion = (index) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index].subQuestions.push({ questionText: "" });
    setForm({
      ...form,
      questions: updatedQuestions,
    });
  };

  // Handle sub-question changes (for comprehension questions)
  const handleSubQuestionChange = (qIndex, subIndex, subQuestionText) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[qIndex].subQuestions[subIndex].questionText =
      subQuestionText;
    setForm({
      ...form,
      questions: updatedQuestions,
    });
  };

  // Add an option for categorize questions
  const addOption = (index) => {
    setForm({
      ...form,
      questions: form.questions.map((question, i) =>
        i === index
          ? { ...question, options: [...question.options, ""] }
          : question
      ),
    });
  };

  // Handle changes in the options of categorize questions
  const handleOptionChange = (qIndex, optIndex, value) => {
    setForm({
      ...form,
      questions: form.questions.map((question, i) =>
        i === qIndex
          ? {
              ...question,
              options: question.options.map((opt, j) =>
                j === optIndex ? value : opt
              ),
            }
          : question
      ),
    });
  };

  // Delete an option from categorize questions
  const deleteOption = (qIndex, optIndex) => {
    setForm({
      ...form,
      questions: form.questions.map((question, i) =>
        i === qIndex
          ? {
              ...question,
              options: question.options.filter((_, j) => j !== optIndex),
            }
          : question
      ),
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Create a New Form</h1>
      {message && <p className="text-red-500 my-2">{message}</p>}
      <div>
        <input
          type="text"
          placeholder="Header image URL"
          value={form.headerImage}
          onChange={(e) => setForm({ ...form, headerImage: e.target.value })}
          className="border p-2 w-full my-2"
        />
        {form.headerImage && (
          <img
            src={form.headerImage}
            alt="Header Preview"
            className="w-full my-4"
          />
        )}
      </div>

      {/* Iterate over each question */}
      {form.questions.map((q, index) => (
        <div key={index} className="border p-4 my-2">
          <select
            value={q.type}
            onChange={(e) => handleQuestionTypeChange(index, e.target.value)}
            className="border p-2 mb-2"
          >
            <option value="">Select Question Type</option>
            <option value="categorize">Categorize</option>
            <option value="cloze">Cloze</option>
            <option value="comprehension">Comprehension</option>
          </select>
          <input
            type="text"
            placeholder={`Question ${index + 1} Text`}
            value={q.questionText}
            onChange={(e) =>
              setForm({
                ...form,
                questions: form.questions.map((question, i) =>
                  i === index
                    ? { ...question, questionText: e.target.value }
                    : question
                ),
              })
            }
            className="border p-2 w-full"
          />

          {/*  for categorize question */}
          {q.type === "categorize" && (
            <>
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center my-2">
                  <input
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(index, optIndex, e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                  <button
                    onClick={() => deleteOption(index, optIndex)}
                    className="bg-red-500 text-white px-2 py-1 ml-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={() => addOption(index)}
                className="bg-gray-500 text-white px-2 py-1 mt-2"
              >
                Add Option
              </button>
            </>
          )}

          {/*comprehension passage and sub-questions */}
          {q.type === "comprehension" && (
            <>
              <textarea
                placeholder="Enter passage text"
                value={q.passage}
                onChange={(e) => handlePassageChange(index, e.target.value)}
                className="border p-2 w-full my-2"
              />
              <h3 className="text-lg font-semibold">Sub-Questions</h3>
              {q.subQuestions.map((subQuestion, subIndex) => (
                <div key={subIndex} className="my-2">
                  <input
                    type="text"
                    placeholder={`Sub-question ${subIndex + 1}`}
                    value={subQuestion.questionText}
                    onChange={(e) =>
                      handleSubQuestionChange(index, subIndex, e.target.value)
                    }
                    className="border p-2 w-full"
                  />
                </div>
              ))}
              <button
                onClick={() => addSubQuestion(index)}
                className="bg-blue-500 text-white px-4 py-2 mt-2"
              >
                Add Sub-Question
              </button>
            </>
          )}
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white px-4 py-2 cursor-pointer"
      >
        Add Question
      </button>
      <button
        onClick={() => handleSave(form)}
        className="bg-green-500 text-white px-4 py-2 ml-2 cursor-pointer rounded"
      >
        Save Form
      </button>

      {/* Form Preview */}
      <div className="w-1/2 p-4">
        <FormPreview form={form} />
      </div>
    </div>
  );
}
