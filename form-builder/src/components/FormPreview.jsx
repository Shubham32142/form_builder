import React from "react";
import { Question } from "./Question";

export function FormPreview({ form }) {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Form Preview</h1>
      {form.headerImage && (
        <img
          src={form.headerImage}
          alt="Header"
          className="w-full my-4 border rounded"
        />
      )}
      {form.questions.map((question, index) => (
        <Question key={index} question={question} onAnswerChange={() => {}} />
      ))}
    </div>
  );
}
