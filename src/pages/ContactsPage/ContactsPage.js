import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { Contact, AddContact } from 'components';
import { useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { Flex } from 'styled';

const ContactsPage = () => {

    const [{ isLoggenIn, currentUser }] = useContext(CurrentUserContext);
    const [{ response }, doFetch] = useFetch();

    const onContactDelete = (contacts, removingContactIndex) => {
        doFetch({
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                contacts: [
                    ...contacts.slice(0, removingContactIndex),
                    ...contacts.slice(removingContactIndex + 1),
                ]
            })
        }, (`/users/${currentUser.id}`))
        console.log(111, response)
    }

    const onContactEdit = (contacts, editedContactIndex, newContact) => {

    }

    useEffect(() => {
        if (isLoggenIn) {
            doFetch({}, (`/users/${currentUser.id}`))
        }
    }, [doFetch, currentUser, isLoggenIn])

    if (!isLoggenIn) {
        return <Redirect to='/login' />
    }

    if (response) {
        let contacts;
        if (response.contacts && response.contacts.length > 0) {
            contacts = response.contacts.map((contact, index) => (
                <Contact
                    key={contact.contactName + index}
                    name={contact.contactName}
                    accounts={contact.accounts}
                    onDelete={() => onContactDelete(response.contacts, index)}
                    onEdit={() => onContactEdit(response.contacts, index)} />
            ))
        } else {
            contacts = <h1>Добавьте ваш первый контакт:</h1>
        }
        return <>
            {contacts}
            <AddContact contacts={response.contacts} userId={currentUser.id} />
        </>
    }

    return (
        <Flex justifyCenter style={{ marginTop: '50px' }}>
            <Spin size="large" />
        </Flex>
    )
}

export default ContactsPage;