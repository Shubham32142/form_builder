const BASE_URL = "https://form-builder-ooeb.onrender.com/api";

export const createForm = `${BASE_URL}/forms/create`;
export const getForms = `${BASE_URL}/forms`;
export const submitResponse = (formId) => `${BASE_URL}/forms/${formId}/submit`;
export const getFormId = (formId) => `${BASE_URL}/forms/${formId}`;
