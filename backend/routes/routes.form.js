import {
  createForm,
  getFormById,
  getForms,
  submitResponse,
} from "../controller/controller.form.js";

function Routes(app) {
  app.post("/api/forms/create", createForm);
  app.get("/api/forms", getForms);
  app.post("/api/forms/:formId/submit", submitResponse);
  app.get("/api/forms/:formId", getFormById);
}
export default Routes;
