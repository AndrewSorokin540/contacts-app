import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { Contact, AddContactForm } from 'components';
import { useFetch } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { Flex } from 'styled';

const ContactsPage = () => {

    const [{ isLoggenIn, currentUser }] = useContext(CurrentUserContext);
    const [{ response }, doFetch] = useFetch();

    useEffect(() => {
        if (isLoggenIn) {
            doFetch({}, (`/users/${currentUser.id}`))
        }
    }, [doFetch, currentUser, isLoggenIn])

    if (!isLoggenIn) {
        return <Redirect to='/login' />
    }

    if (response) {
        console.log('response', response)
        let contacts;
        if (response.contacts && response.contacts.length > 0) {
            contacts = response.contacts.map((contact, index) => (
                <Contact key={contact.contactName + index} name={contact.contactName} accounts={contact.accounts} />
            ))
        } else {
            contacts = <h1>Добавьте ваш первый контакт:</h1>
        }
        return <>
            {contacts}
            <AddContactForm contacts={response.contacts} userId={currentUser.id} />
        </>
    }

    return (
        <Flex justifyCenter style={{ marginTop: '50px' }}>
            <Spin size="large" />
        </Flex>
    )
}

export default ContactsPage;