import React from 'react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Flex } from 'styled';
import { Wrapper, Name, ContactValue } from './styled';

const Contact = ({ contact }) => {
    const { contactName, contactsItems } = contact;

    const mapTypeToIcon = (type) => {
        switch (type) {
            case 'phone':
                return <PhoneOutlined />

            case 'whatsApp':
                return <WhatsAppOutlined />

            default:
                return null;
        }
    }

    const ContactItem = ({ itemType, value }) => {
        return (
            <Flex alignCenter>
                {mapTypeToIcon(itemType)}
                <ContactValue>{value}</ContactValue>
            </Flex>
        )
    }
    return (
        <Wrapper>
            <Name>{contactName}</Name>
            {contactsItems.map(({ itemType, value }) => <ContactItem key={itemType + value} itemType={itemType} value={value} />)}
        </Wrapper >
    );
}

export default Contact;
