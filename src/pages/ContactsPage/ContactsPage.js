import React, { useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { Contact } from 'components';
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
        console.log(response)
        if (response.contacts.length > 0) {
            return <Contact user={response} />
        }
        return <div>У вас пока нет контактов</div>
    }

    return (
        <Flex justifyCenter style={{ marginTop: '50px' }}>
            <Spin size="large" />
        </Flex>
    )
}

export default ContactsPage;