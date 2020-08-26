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

    const onContactAdd = (contactName, accounts, index) => {
        doFetch({
            method: 'PATCH',
            body: JSON.stringify({
                contacts:
                    [
                        ...currentUserContacts,
                        { contactName, accounts }
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

    const onContactEdit = (contactName, accounts, index) => {
        doFetch({
            method: 'PATCH',
            body: JSON.stringify({
                contacts:
                    [
                        ...currentUserContacts.slice(0, index),
                        { contactName, accounts },
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
        if (currentUserContacts && currentUserContacts.length > 0) {
            contacts = currentUserContacts.map((contact, index) => (
                <Contact
                    key={contact.contactName + index}
                    name={contact.contactName}
                    onDelete={() => onContactDelete(index)}
                    onEdit={onContactEdit}
                    index={index}
                    accounts={contact.accounts ? contact.accounts : []}
                />
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
                accounts={[]}
            />
        </>
    }
}

export default ContactsPage;