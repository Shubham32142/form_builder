import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getForms } from "../services/api";
export function Home() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(getForms);
        setForms(response.data.forms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Form Builder</h1>
      <div className="mb-4">
        <Link
          to="/create-form"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create New Form
        </Link>
      </div>
      <h2 className="text-xl font-semibold">Existing Forms</h2>
      {forms.length === 0 ? (
        <p>No forms found. Create a new form!</p>
      ) : (
        <ul className="list-disc pl-5">
          {forms.map((form) => (
            <li key={form._id} className="mb-2">
              <Link
                to={`/fill-form/${form._id}`}
                className="text-blue-500 underline"
              >
                {form.headerImage ? (
                  <img
                    src={form.headerImage}
                    alt="Header"
                    className="inline-block w-10 h-10 mr-2"
                  />
                ) : null}
                Form {form._id}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
