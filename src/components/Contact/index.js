import React from 'react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Wrapper, Name } from './styled';

const Contact = ({ user }) => {
    const { username, contacts } = user;

    console.log(user)

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
            <Name>{username}</Name>
            {contacts && contacts.map(({ name, items }) => {
                return (
                    <div key={name}>
                        <div>{name}</div>
                        {items.map(({ type, value }) => {
                            return (
                                <div key={type + value}>
                                    <div>{mapTypeToIcon(type)}</div>
                                    <div>{value}</div>
                                </div>
                            )
                        })}
                    </div>
                )
            })}
        </Wrapper >
    );
}

export default Contact;
