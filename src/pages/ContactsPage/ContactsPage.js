import React, { useState, useEffect } from 'react';
import { Contact } from 'components';

const ContactsPage = () => {

    const [users, setUsers] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false)

    useEffect(() => {
        if (!dataLoaded) {
            fetch('http://localhost:3000/users')
                .then(response => response.json())
                .then(users => setUsers(users));

            setDataLoaded(true);
        }
    }, [users])

    return (
        users.map(user => {
            return <Contact key={user.username} user={user} />
        })
    )
}

export default ContactsPage;