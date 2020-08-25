import React from 'react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { EditContact } from 'components';
import { Flex } from 'styled';
import { Wrapper, ContactValue, Delete } from './styled';

const Contact = ({ name, accounts, onDelete, onEdit }) => {

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

    return (
        <Wrapper>
            <h4>{name}</h4>
            <Delete onClick={onDelete} />
            {accounts.map(({ type, value }) => (
                <Flex key={type + value}>
                    <div>{mapTypeToIcon(type)}</div>
                    <ContactValue>{value}</ContactValue>
                </Flex>
            ))}
            <EditContact />
        </Wrapper >
    );
}

export default Contact;
