import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const EditContact = ({ accounts }) => {
    const [modalOpen, setModalOpen] = useState(false);

    const onSubmit = () => {
        setModalOpen(false)
    }

    const onCancel = () => {
        setModalOpen(false)
    }

    return (
        <>
            <Button onClick={() => setModalOpen(true)}>Редактировать контакт</Button>
            <Modal
                title="Редактировать контакт"
                visible={modalOpen}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSubmit}>
                        Редактировать
                    </Button>
                ]}>
                asd
            </Modal>
        </>
    )
}

export default EditContact;