import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { useFetch } from 'hooks';

const { Option } = Select;

const AddContactForm = ({ contacts, userId }) => {
    const [newContactName, setNewContactName] = useState('Новый контакт');
    const [newContactType, setNewContactType] = useState('phone');
    const [newContactValue, setNewContactValue] = useState(null);
    const [{ response }, doFetch] = useFetch();
    console.log('response on contact send', response)

    const sendNewContact = () => {
        doFetch({
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                contacts: [
                    ...contacts,
                    {
                        contactName: newContactName,
                        accounts: [
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
        <Form layout='horizontal' name="newContact" onFinish={sendNewContact}>

            <Form.Item >
                <Input onChange={e => setNewContactName(e.target.value)} placeholder='Имя контакта' />
            </Form.Item>

            <Form.Item >
                <Input.Group compact>
                    <Select value={newContactType} onChange={value => setNewContactType(value)}>
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
    )
}

export default AddContactForm;