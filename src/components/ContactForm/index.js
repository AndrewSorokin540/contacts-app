import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import {
    PhoneOutlined,
    WhatsAppOutlined,
    MailOutlined,
    GithubOutlined,
    SkypeOutlined,
    SmileOutlined
} from '@ant-design/icons';

const ContactForm = ({ title, icon, buttonType, onSubmit, index, contactName: name = '', accounts }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactName, setContactName] = useState(name);
    const [phone, setPhone] = useState(accounts.phone ? accounts.phone : '');
    const [whatsApp, setWhatsApp] = useState(accounts.whatsApp || '');
    const [email, setEmail] = useState(accounts.email || '');
    const [skype, setSkype] = useState(accounts.skype || '');
    const [github, setGithub] = useState(accounts.github || '');

    const onOk = () => {
        onSubmit(contactName, { phone, whatsApp, email, skype, github }, index);
        setModalOpen(false);
        setContactName('');
        setPhone('');
        setWhatsApp('');
        setEmail('');
        setSkype('');
        setGithub('');
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
                        Ок
                    </Button>
                ]}>
                <Form layout='horizontal' name="newContact" >
                    <Form.Item label={<SmileOutlined />}>
                        <Input value={contactName} onChange={e => setContactName(e.target.value)} placeholder='Имя контакта' />
                    </Form.Item>
                    <Form.Item label={<PhoneOutlined />}>
                        <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder='Телефон' />
                    </Form.Item>
                    <Form.Item label={<WhatsAppOutlined />}>
                        <Input value={whatsApp} onChange={e => setWhatsApp(e.target.value)} placeholder='WhatsApp' />
                    </Form.Item>
                    <Form.Item label={<MailOutlined />}>
                        <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                    </Form.Item>
                    <Form.Item label={<SkypeOutlined />}>
                        <Input value={skype} onChange={e => setSkype(e.target.value)} placeholder='Skype' />
                    </Form.Item>
                    <Form.Item label={<GithubOutlined />}>
                        <Input value={github} onChange={e => setGithub(e.target.value)} placeholder='Github' />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default ContactForm;