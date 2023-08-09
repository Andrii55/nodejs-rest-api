const express = require("express");
const crypto = require("node:crypto");
const Joi = require("joi");
const contactFunctions = require("../../models/contacts");

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contactData = await contactFunctions.listContacts();
    res.json(contactData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactData = await contactFunctions.getContactById(id);

    res.json(contactData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error, value } = updateContactSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const newContact = { ...value, id: crypto.randomUUID() };
    await contactFunctions.addContact(newContact);
    res.status(201).json(newContact);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactData = await contactFunctions.removeContact(id);
    res.json(contactData);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = updateContactSchema.validate(req.body);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const updateContact = await contactFunctions.updateContact(id, value);
    res.json(updateContact);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
