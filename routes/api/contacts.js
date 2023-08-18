const express = require("express");

const contactFunctions = require("../../models/contacts");

const router = express.Router();

router.get("/", contactFunctions.listContacts);
router.get("/:id", contactFunctions.getContactById);
router.post("/", contactFunctions.addContact);
router.delete("/:id", contactFunctions.removeContact);
router.patch("/:id", contactFunctions.updateStatusContact);

module.exports = router;
