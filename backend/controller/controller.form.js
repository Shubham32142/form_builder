import { Form, Response } from "../models/model.form.js";

//create a new form
export async function createForm(req, res) {
  try {
    const form = new Form(req.body);
    await form.save();
    res.status(201).json({ message: "Form created successfully", form });
  } catch (error) {
    res.status(500).json({ message: "error catching form", error });
  }
}

//get all forms

export async function getForms(req, res) {
  try {
    const forms = await Form.find();
    res.status(200).json({ message: "All forms", forms });
  } catch (error) {
    res.status(500).json({ message: "Cannot get forms", error });
  }
}

//Submit response form

export async function submitResponse(req, res) {
  try {
    const { formId } = req.params;
    const { answers } = req.body;
    const response = new Response({ formId, answers });
    await response.save();
    res
      .status(201)
      .json({ message: "Response submitted successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Error submitting response", error });
  }
}

//get forms

export async function getFormById(req, res) {
  try {
    const { formId } = req.params;
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error });
  }
}
