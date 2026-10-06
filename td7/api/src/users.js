let contacts = []

async function getContacts(req, res) {
    res.status(200).send(contacts);
}

async function addContact(req, res) {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).send({ message: 'Name and email are required' });
    }

    const contact = { name, email };
    contacts.push(contact);

    res.status(201).send(contact);
}

export default { getContacts, addContact }
