const Joi = require("joi");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 4 and 30 characters and contain only letters and numbers",
      "any.required": "Password is a required field",
    }),
});

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.base": "Username should be a type of text",
    "string.alphanum": "Username should contain only alphanumeric characters",
    "string.min": "Username should have a minimum length of 3 characters",
    "string.max": "Username should have a maximum length of 30 characters",
    "any.required": "Username is a required field",
  }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{4,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 4 and 30 characters and contain only letters and numbers",
      "any.required": "Password is a required field",
    }),

  role: Joi.string().valid("User", "Manager").required().messages({
    "any.only": "Role must be either 'User' or 'Manager'",
    "any.required": "Role is a required field",
  }),
});

const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  projectCode: Joi.string().required(),
  location: Joi.string().required(),
  contact: Joi.number().required(),
  focalpointname: Joi.string().required(),
  clientName: Joi.string().required(),
  clientcontact: Joi.number().required(),
  clients: Joi.string().required(),
});

const manPowerSchema = Joi.object({
  projectId: Joi.string().required(),
  companyName: Joi.string().required(),
  designation: Joi.string().required(),
  costPerDay: Joi.number().required(),
  remarks: Joi.string().required(),
});

const dprEntrySchema = Joi.object({
  date: Joi.date().required(),
  projectId: Joi.string().required(),
  building: Joi.string().required(),
  unit: Joi.string().required(),
  elevation: Joi.string().required(),
  surface: Joi.string().required(),
  system: Joi.string().required(),
  activity: Joi.string().required(),
  area: Joi.number().required(),
  // materialCategory: Joi.string(),
  // material: Joi.string(),
  // usage: Joi.number(),
  company: Joi.string().required(),
  numberofOperative: Joi.number().required(),
});

const buildingSchema = Joi.object({
  projectId: Joi.string().required(),
  buildingName: Joi.string().required(),
});

const unitSchema = Joi.object({
  buildingId: Joi.string().required(),
  unitName: Joi.string().required(),
});

const elevationSchema = Joi.object({
  unitId: Joi.string().required(),
  elevationName: Joi.string().required(),
});

const surfaceSchema = Joi.object({
  elevationId: Joi.string().required(),
  surfaceName: Joi.string().required(),
  area: Joi.number().required(),
});

const systemSchema = Joi.object({
  surfaceId: Joi.string().required(),
  systemName: Joi.string().required(),
});

const activitySchema = Joi.object({
  systemId: Joi.string().required(),
  activityName: Joi.string().required(),
  manPowerperDay: Joi.number().required(),
});

module.exports = {
  loginSchema,
  createUserSchema,
  projectSchema,
  manPowerSchema,
  dprEntrySchema,
  buildingSchema,
  unitSchema,
  elevationSchema,
  surfaceSchema,
  systemSchema,
  activitySchema,
};
