import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';
import { CurrentUserContext } from 'contexts';
import { useFetch } from 'hooks';

const { Option } = Select;

const AddContactForm = ({ contacts, userId }) => {
    const [modalOpen, setModalOpen] = useState(false)
    const [newContactName, setNewContactName] = useState('Новый контакт');
    const [newContactType, setNewContactType] = useState('phone');
    const [newContactValue, setNewContactValue] = useState(null);
    const [{ response }, doFetch] = useFetch();
    const [, setUserContext] = useContext(CurrentUserContext);
    console.log('response on contact send', response);

    const onCancel = () => {
        setModalOpen(false)
    }

    const onSubmit = () => {
        setModalOpen(false);
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

    useEffect(() => {
        if (response) {
            setUserContext(state => ({
                ...state,
                currentUser: {
                    ...state.currentUser,
                    contacts: response
                }
            }))
        }
    }, [response])

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>Добавить контакт</Button>
            <Modal
                title="Добавить контакт"
                visible={modalOpen}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSubmit}>
                        Добавить
                    </Button>
                ]}>
                <Form layout='vertical' name="newContact" wrapperCol={{ span: 24 }}>
                    <Form.Item >
                        <Input onChange={e => setNewContactName(e.target.value)} placeholder='Имя контакта' />
                    </Form.Item>
                    <Form.Item >
                        <Input.Group compact>
                            <Select style={{ width: '30%' }} value={newContactType} onChange={value => setNewContactType(value)}>
                                <Option value="phone">Телефон</Option>
                                <Option value="whatsApp">WhatsApp</Option>
                            </Select>
                            <Input style={{ width: '70%' }} onChange={e => setNewContactValue(e.target.value)} placeholder={newContactType === 'phone' ? 'Телефон' : 'Аккаунт WhatsApp'} />
                        </Input.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddContactForm;