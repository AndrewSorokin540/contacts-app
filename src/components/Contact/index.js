import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useFetch } from 'hooks';
import { Flex } from 'styled';
import { Wrapper, ContactValue } from './styled';

const { Option } = Select;

const Contact = ({ user }) => {
    const { contacts, id: userId } = user;
    const [{ response }, doFetch] = useFetch();
    const [formOpen, setFormOpen] = useState(false);
    const [newContactType, setNewContactType] = useState('phone');
    const [newContactValue, setNewContactValue] = useState(null);

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

    const sendNewContact = () => {
        console.log(newContactType, newContactValue)
        doFetch({
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                contacts: [
                    {
                        items: [
                            ...contacts.items,
                            {
                                type: newContactType,
                                value: newContactValue
                            }
                        ]
                    }
                ]
            })
        }, `/users/${userId}`)
    }

    return (
        <Wrapper>
            {contacts && contacts.map(({ items }) => (
                items.map(({ type, value }) => (
                    <Flex key={type + value}>
                        <div>{mapTypeToIcon(type)}</div>
                        <ContactValue>{value}</ContactValue>
                    </Flex>
                ))
            ))}
            <Form
                layout='horizontal'
                name="newContact"
                onFinish={sendNewContact}>

                <Form.Item
                    name={['type']}
                    value={newContactType}
                >
                    <Input.Group compact>
                        <Select defaultValue="phone" onChange={value => setNewContactType(value)}>
                            <Option value="phone">Телефон</Option>
                            <Option value="whatsApp">WhatsApp</Option>
                        </Select>
                        <Input onChange={e => setNewContactValue(e.target.value)} placeholder={newContactType === 'phone' ? 'Телефон' : 'Аккаунт WhatsApp'} />
                    </Input.Group>
                </Form.Item>

                <Form.Item>
                    <Button size="large" block type="primary" htmlType="submit">
                        Добавить
                    </Button>
                </Form.Item>

            </Form>
        </Wrapper >
    );
}

export default Contact;
