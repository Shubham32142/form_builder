import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Question } from "../components/Question";
import { getFormId, submitResponse } from "../services/api";

export function FillForm() {
  const { formId } = useParams(); // Get formId from the URL
  const [form, setForm] = useState(null); // Form data from the backend
  const [responses, setResponses] = useState([]); // User responses

  // Fetch the form data when the component mounts
  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(getFormId(formId));
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form:", error);
      }
    };

    fetchForm();
  }, [formId]);

  // Handling user input for responses
  const handleAnswerChange = (questionId, answerData) => {
    setResponses((prev) => {
      const existingResponse = prev.find((r) => r.questionId === questionId);

      if (existingResponse) {
        // To Update the existing response
        return prev.map((r) =>
          r.questionId === questionId ? { ...r, ...answerData } : r
        );
      } else {
        // To Add a new response
        return [...prev, { questionId, ...answerData }];
      }
    });
  };

  // Submit user responses
  const handleSubmit = async () => {
    try {
      const response = await axios.post(submitResponse(formId), {
        answers: responses,
      });
      alert("Responses submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting responses:", error);
      alert("An error occurred while submitting your responses.");
    }
  };

  // Showing loading message if the form hasn't been fetched yet
  if (!form) {
    return <p>Loading form...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">
        {form.headerImage && <img src={form.headerImage} alt="Header" />}
      </h1>
      <p className="text-lg mb-4">{form.headerText}</p>
      {form.questions.map((question, index) => (
        <Question
          key={index}
          question={question}
          onAnswerChange={handleAnswerChange}
        />
      ))}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Submit Responses
      </button>
    </div>
  );
}

export default FillForm;
