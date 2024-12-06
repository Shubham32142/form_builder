import React from "react";

export function Question({ question, onAnswerChange }) {
  return (
    <div className="p-4 border rounded my-4">
      {/*  Question Text */}
      <p className="text-lg font-semibold">{question.questionText}</p>

      {/* Optional Image */}
      {question.image && (
        <img
          src={question.image}
          alt="Question"
          className="w-full my-2 border rounded"
        />
      )}

      {/* Handling Question Types */}
      {question.type === "categorize" && (
        <select
          className="border p-2 w-full"
          onChange={(e) =>
            onAnswerChange(question.id, { answer: e.target.value })
          }
        >
          <option value="">Select an option</option>
          {question.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {question.type === "cloze" && (
        <p className="text-lg">
          {question.questionText.split("---").map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < question.questionText.split("[[blank]]").length - 1 && (
                <input
                  type="text"
                  className="border p-2 mx-2"
                  placeholder="Type here"
                  onChange={(e) =>
                    onAnswerChange(question.id, { answer: e.target.value })
                  }
                />
              )}
            </React.Fragment>
          ))}
        </p>
      )}

      {question.type === "comprehension" && (
        <>
          {/*  Passage */}
          {question.passage && (
            <div className="bg-gray-100 p-4 rounded my-2">
              {question.passage}
            </div>
          )}

          {/* Sub-Questions */}
          {(question.subQuestions || []).map((subQuestion, index) => (
            <div key={index} className="my-2">
              <p>{subQuestion.questionText}</p>{" "}
              {/* Displaying the sub-question text */}
              <input
                type="text"
                placeholder="Type your answer here"
                className="border p-2 w-full"
                onChange={(e) =>
                  onAnswerChange(question.id, {
                    subQuestionId: subQuestion.id,
                    answer: e.target.value,
                  })
                }
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}
