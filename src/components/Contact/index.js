import React from 'react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Flex } from 'styled';
import { Wrapper, ContactValue } from './styled';

const Contact = ({ name, accounts }) => {

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
            {accounts.map(({ type, value }) => (
                <Flex key={type + value}>
                    <div>{mapTypeToIcon(type)}</div>
                    <ContactValue>{value}</ContactValue>
                </Flex>
            ))}
        </Wrapper >
    );
}

export default Contact;
