import React from 'react';
import { Button } from 'antd';
import { PhoneOutlined, WhatsAppOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
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
            <Button danger icon={<DeleteOutlined />} onClick={onDelete}>Удалить</Button>
            <ContactForm
                title='Редактировать'
                icon={<EditOutlined />}
                onSubmit={onEdit}
                contactName={name}
                {...other}
            />
        </Wrapper >
    );
}

export default Contact;
