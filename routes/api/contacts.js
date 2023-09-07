const express = require("express");

const router = express.Router();

const { contactsController } = require("../../controller");

const { chekJwtToken } = require("../../middlewares");

router.get("/", chekJwtToken, contactsController.listContacts);
router.get("/:id", chekJwtToken, contactsController.getContactById);
router.post("/", chekJwtToken, contactsController.addContact);
router.delete("/:id", chekJwtToken, contactsController.removeContact);
router.patch("/:id", chekJwtToken, contactsController.updateStatusContact);

module.exports = router;
