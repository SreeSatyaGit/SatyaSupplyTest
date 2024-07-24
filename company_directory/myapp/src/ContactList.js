import React from 'react';

function ContactList() {

  const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('/api/contacts/')
            .then(response => response.json())
            .then(data => setContacts(data));
    }, []);

  return (
    <section id="contact">
      <div>
            <h1>Contact List</h1>
            <ul>
                {contacts.map(contact => (
                    <li key={contact.id}>{contact.name}</li>
                ))}
            </ul>
        </div>
    </section>
  );
}

export default ContactList;