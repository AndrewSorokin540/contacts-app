import React from 'react';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { ContactForm } from 'components';
import { Wrapper, Delete } from './styled';

const Contact = ({ name, accounts, onDelete, onEdit, ...other }) => {

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
            <ContactForm title='Edit' onSubmit={onEdit} contactName={name} {...other} />
        </Wrapper >
    );
}

export default Contact;
