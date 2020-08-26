import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';

const { Option } = Select;

const ContactForm = ({ contact, title, onSubmit }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactName, setContactName] = useState('');

    const onOk = () => {
        onSubmit(contactName);
        setModalOpen(false);
    }

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>{title}</Button>
            <Modal
                title="Добавить контакт"
                visible={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setModalOpen(false)}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={onOk}>
                        Добавить
                    </Button>
                ]}>
                <Form layout='vertical' name="newContact" wrapperCol={{ span: 24 }}>
                    <Form.Item >
                        <Input value={contactName} onChange={e => setContactName(e.target.value)} placeholder='Имя контакта' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ContactForm;