import React from 'react';
import { Button, List } from 'antd';
import {
    PhoneOutlined,
    WhatsAppOutlined,
    MailOutlined,
    GithubOutlined,
    SkypeOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { ContactForm } from 'components';
import { Wrapper } from './styled';

const Contact = ({ name, accounts, onDelete, onEdit, ...other }) => {

    const mapTypeToIcon = (type) => {
        switch (type) {
            case 'phone':
                return <PhoneOutlined />
            case 'whatsApp':
                return <WhatsAppOutlined />
            case 'email':
                return <MailOutlined />
            case 'skype':
                return <SkypeOutlined />
            case 'github':
                return <GithubOutlined />

            default:
                return null;
        }
    }

    return (
        <Wrapper>
            <h4>{name}</h4>
            <List itemLayout="vertical">
                {
                    Object.keys(accounts)
                        .filter(key => accounts[key])
                        .map(key => (
                            <List.Item key={key}>
                                {mapTypeToIcon(key)} : {accounts[key]}
                            </List.Item>
                        ))
                }
            </List>
            <Button danger icon={<DeleteOutlined />} onClick={onDelete}>Удалить</Button>
            &nbsp;
            <ContactForm
                title='Редактировать'
                icon={<EditOutlined />}
                onSubmit={onEdit}
                contactName={name}
                accounts={accounts}
                {...other}
            />
        </Wrapper >
    );
}

export default Contact;
