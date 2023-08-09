const fs = require("node:fs/promises");
const path = require("node:path");

const contactPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contactData = JSON.parse(await fs.readFile(contactPath));
  return contactData;
};

const getContactById = async (id) => {
  const contactData = JSON.parse(await fs.readFile(contactPath));
  const contact = contactData.find((contact) => String(contact.id) === id);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const removeContact = async (id) => {
  const contactData = JSON.parse(await fs.readFile(contactPath));
  const updatedContact = contactData.filter(
    (contact) => String(contact.id) !== id
  );
  if (updatedContact.length === contactData.length) {
    throw new Error("Contact not found");
  }
  await fs.writeFile(contactPath, JSON.stringify(updatedContact));
  return updatedContact;
};

const addContact = async (body) => {
  const contactData = JSON.parse(await fs.readFile(contactPath));
  contactData.push(body);
  await fs.writeFile(contactPath, JSON.stringify(contactData));
  return contactData;
};

const updateContact = async (id, body) => {
  const contactData = JSON.parse(await fs.readFile(contactPath));
  const contactIndex = contactData.findIndex(
    (contact) => String(contact.id) === id
  );
  if (contactIndex !== -1) {
    contactData[contactIndex] = { ...contactData[contactIndex], ...body };
    await fs.writeFile(contactPath, JSON.stringify(contactData));
    return contactData[contactIndex];
  }
  throw new Error("Contact not found");
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
