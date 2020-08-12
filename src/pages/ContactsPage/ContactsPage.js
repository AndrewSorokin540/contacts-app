import React from 'react';
import { Contact } from 'components';

const tempContactsArray = [
    {
        contactName: 'Василий Рогов',
        contactsItems: [
            {
                itemType: 'phone',
                value: 88002000600
            },
            {
                itemType: 'whatsApp',
                value: 88002000600
            }
        ]
    },
    {
        contactName: 'Анатолий Дукалис',
        contactsItems: [
            {
                itemType: 'phone',
                value: 85552000777
            },
            {
                itemType: 'whatsApp',
                value: 85552000777
            }
        ]
    }
]

const ContactsPage = ({ contacts }) => {
    return (
        tempContactsArray.map(contact => {
            return <Contact key={contact.contactName} contact={contact} />
        })
    )
}

export default ContactsPage;