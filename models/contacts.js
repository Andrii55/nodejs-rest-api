const { Contact } = require("./contact_module");

const listContacts = async (req, res, next) => {
  try {
    const contactData = await Contact.find();
    res.status(200).json(contactData);
  } catch (e) {
    next(e);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (contact) {
      return res.status(200).json(contact);
    }
    throw new Error("Contact not found");
  } catch (e) {
    next(e);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { body } = req;
    const contacts = await Contact.create(body);
    if (body.name && body.email && body.phone) {
      return res.status(201).json(contacts);
    }
    throw new Error("Name, email, and phone are required");
  } catch (e) {
    next(e);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findOneAndDelete({ _id: id });

    if (contact) {
      return res.status(204).json();
    }
    throw new Error("Contact not found");
  } catch (e) {
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id },
      { favorite },
      { new: true }
    );
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    }
    throw new Error("Contact not found");
  } catch (e) {
    next(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
};
