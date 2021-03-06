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

import { ErrorMessage } from 'components';

const ContactForm = ({ title, icon, buttonType, onSubmit, index, contactName: name = '', accounts }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [contactName, setContactName] = useState(name);
    const [phone, setPhone] = useState(accounts.phone ? accounts.phone : '');
    const [whatsApp, setWhatsApp] = useState(accounts.whatsApp || '');
    const [email, setEmail] = useState(accounts.email || '');
    const [skype, setSkype] = useState(accounts.skype || '');
    const [github, setGithub] = useState(accounts.github || '');
    const [showNoNameMessage, setShowNoNameMessage] = useState(false);
    const [showNoAccountsMessage, setShowNoAccountsMessage] = useState(false);

    const noName = !contactName
    const noAccounts = !phone && !whatsApp && !email && !skype && !github

    const onOk = () => {
        if (!noName && !noAccounts) {
            onSubmit(contactName, { phone, whatsApp, email, skype, github }, index);
            setModalOpen(false);
            setContactName('');
            setPhone('');
            setWhatsApp('');
            setEmail('');
            setSkype('');
            setGithub('');
            setShowNoNameMessage(false)
            setShowNoAccountsMessage(false)
        } else if (noName && noAccounts) {
            setShowNoNameMessage(true)
            setShowNoAccountsMessage(true)
        } else if (noName && !noAccounts) {
            setShowNoAccountsMessage(false)
            setShowNoNameMessage(true)
        } else if (!noName && noAccounts) {
            setShowNoNameMessage(false)
            setShowNoAccountsMessage(true)
        }
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
                        <Input type='number' required value={phone} onChange={e => setPhone(e.target.value)} placeholder='Телефон' />
                    </Form.Item>
                    <Form.Item label={<WhatsAppOutlined />}>
                        <Input value={whatsApp} onChange={e => setWhatsApp(e.target.value)} placeholder='WhatsApp' />
                    </Form.Item>
                    <Form.Item label={<MailOutlined />}>
                        <Input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' />
                    </Form.Item>
                    <Form.Item label={<SkypeOutlined />}>
                        <Input value={skype} onChange={e => setSkype(e.target.value)} placeholder='Skype' />
                    </Form.Item>
                    <Form.Item label={<GithubOutlined />}>
                        <Input value={github} onChange={e => setGithub(e.target.value)} placeholder='Github' />
                    </Form.Item>
                </Form>
                {showNoNameMessage && <ErrorMessage text='Пожалуйста, введите имя контакта' />}
                {showNoAccountsMessage && <ErrorMessage text='Заполните хотя-бы одно поле контактов' />}
            </Modal>
        </>
    )
}

export default ContactForm;