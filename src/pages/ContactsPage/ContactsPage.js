import React, { useEffect } from 'react';
import { Spin } from 'antd';
import { Contact } from 'components';
import { useFetch } from 'hooks';
import { Flex } from 'styled';

const ContactsPage = () => {

    const [{ response }, doFetch] = useFetch('/users/');

    useEffect(() => {
        doFetch()
    }, [doFetch])

    if (response) {
        return (
            response.map(user => {
                return <Contact key={user.username} user={user} />
            })
        )
    }
    return (
        <Flex justifyCenter style={{ marginTop: '50px' }}>
            <Spin size="large" />
        </Flex>
    )

}

export default ContactsPage;