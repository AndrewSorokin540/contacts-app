import React, { useState } from 'react';
import { Form, Input, Button, Select, Modal } from 'antd';

const { Option } = Select;

const ContactForm = ({ title, icon, buttonType, onSubmit, index, contactName: name = '' }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactName, setContactName] = useState(name);

    const onOk = () => {
        onSubmit(contactName, index);
        setModalOpen(false);
        setContactName('');
    }

    return (
        <>
            <Button type={buttonType} onClick={() => setModalOpen(true)} icon={icon}>{title}</Button>
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