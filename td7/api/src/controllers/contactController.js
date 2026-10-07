import Contact from '../models/contactModel.js';

// Get all contacts
export async function getAllContacts() {
  let total = await Contact.countDocuments({});
  let limit = parseInt(total);

  try {
    const contacts = await Contact.find().limit(limit);
    return {
      success: true,
      data: contacts,
      total: total.toString(),
    }
  } catch (err) {
    return { success: false, message: "Contacts not found " + err };
  }
}

// Get contact by Id
export async function getContactById(id) {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return { success: false, message: "Contact not found" };
    }
    return { success: true, data: contact };
  } catch (err) {
    return { success: false, message: "Error finding contact " + err };
  }
}

// Add a new contact, returns the added contact
export async function addContact(body) {
  try {
    const contact = new Contact(body);
    await contact.save();
    return { success: true, data: contact };
  } catch (err) {
    return { success: false, message: "Error adding contact " + err };
  }
}

// Update an existing contact
export async function updateContact(id, name = null, age = null) {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return { success: false, message: "Contact not found" };
    }
    if (name !== null) contact.name = name;
    if (age !== null) contact.age = age;
    await contact.save();
    return { success: true, data: contact };
  } catch (err) {
    return { success: false, message: "Error updating contact " + err };
  }
}


// Remove an existing contact
export async function removeContact(id) {
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return { success: false, message: "Contact not found" };
    }
    return { success: true, message: "Contact deleted successfully" };
  } catch (err) {
    return { success: false, message: "Error deleting contact " + err };
  }
}
