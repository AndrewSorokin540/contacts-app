import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Contact, ContactForm } from 'components';
import { useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';

const ContactsPage = () => {

    const [{ isLoggenIn, currentUser }] = useContext(CurrentUserContext);
    const [{ response }, doFetch] = useFetch(`/users/${currentUser && currentUser.id}`);

    const currentUserContacts = response ? response.contacts : currentUser.contacts;

    const onContactAdd = contactName => {
        doFetch({
            method: 'PATCH',
            body: JSON.stringify({
                contacts:
                    [
                        ...currentUserContacts,
                        { contactName }
                    ]
            })
        })
    }

    const onContactDelete = contactName => {
        const deletedContactIndex = currentUserContacts
            .findIndex(contact => contact.contactName === contactName)
        doFetch({
            method: 'PATCH',
            body: JSON.stringify({
                contacts:
                    [
                        ...currentUserContacts.slice(0, deletedContactIndex),
                        ...currentUserContacts.slice(deletedContactIndex + 1),
                    ]
            })
        })
    }

    const onContactEdit = contactName => {
        console.log(contactName)
    }

    if (!isLoggenIn) {
        return <Redirect to='/login' />
    }

    if (currentUser) {
        let contacts;
        if (currentUserContacts.length > 0) {
            contacts = currentUserContacts.map((contact, index) => (
                <Contact
                    key={contact.contactName + index}
                    name={contact.contactName}
                    accounts={contact.accounts}
                    onDelete={() => onContactDelete(contact.contactName)}
                    onEdit={onContactEdit} />
            ))
        } else {
            contacts = <h1>Добавьте ваш первый контакт:</h1>
        }
        return <>
            {contacts}
            <ContactForm title="Add" onSubmit={onContactAdd} />
        </>
    }
}

export default ContactsPage;