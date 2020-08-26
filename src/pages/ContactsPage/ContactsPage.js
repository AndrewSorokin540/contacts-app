import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { PlusSquareOutlined } from '@ant-design/icons';

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

    const onContactDelete = index => {
        doFetch({
            method: 'PATCH',
            body: JSON.stringify({
                contacts:
                    [
                        ...currentUserContacts.slice(0, index),
                        ...currentUserContacts.slice(index + 1),
                    ]
            })
        })
    }

    const onContactEdit = (contactName, index) => {
        doFetch({
            method: 'PATCH',
            body: JSON.stringify({
                contacts:
                    [
                        ...currentUserContacts.slice(0, index),
                        { contactName },
                        ...currentUserContacts.slice(index + 1),
                    ]
            })
        })
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
                    onDelete={() => onContactDelete(index)}
                    onEdit={onContactEdit}
                    index={index} />
            ))
        } else {
            contacts = <h1>Добавьте ваш первый контакт:</h1>
        }
        return <>
            {contacts}
            <ContactForm
                title="Добавить контакт"
                icon={<PlusSquareOutlined />} buttonType='primary'
                onSubmit={onContactAdd}
            />
        </>
    }
}

export default ContactsPage;