import React, { useState } from "react";
import { FormBuilder } from "../components/FormBuilder";

export function CreateForm() {
  const [form, setForm] = useState({
    headerImage: "",
    questions: [],
  });

  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Form Builder */}
      <div>
        <h1 className="text-2xl font-bold mb-4">Build Your Form</h1>
        <FormBuilder form={form} setForm={setForm} />
      </div>
    </div>
  );
}

export default CreateForm;
