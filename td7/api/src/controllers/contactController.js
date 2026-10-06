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
  // todo
}

// Add a new contact, returns the added contact
export async function addContact(body) {
  // todo
}
 
// Update an existing contact
export async function updateContact(id, name = null, age = null) {
   // todo
}
    
// Remove an existing contact
export async function removeContact(id) {
  // todo
}
