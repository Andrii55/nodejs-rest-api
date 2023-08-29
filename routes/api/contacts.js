const express = require("express");

const { contactsController } = require("../../controller");

const router = express.Router();

const { chekJwtToken } = require("../../middlewares/jwt_token.middlewarse");

router.get("/", chekJwtToken, contactsController.listContacts);
router.get("/:id", chekJwtToken, contactsController.getContactById);
router.post("/", chekJwtToken, contactsController.addContact);
router.delete("/:id", chekJwtToken, contactsController.removeContact);
router.patch("/:id", chekJwtToken, contactsController.updateStatusContact);

module.exports = router;
