const fs = require("fs").promises;
const path = require("path");
var uniqid = require('uniqid');

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find((item) => item.id === Number(contactId));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const newListContacts = data.filter(
      (item) => item.id !== Number(contactId)
    );
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    return newListContacts;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const newContact = {
      name,
      email,
      phone,
      id: uniqid(),
    };
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data));
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
