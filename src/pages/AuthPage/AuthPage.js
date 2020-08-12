import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { FormContainer } from './styled';

const AuthPage = ({ match }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegisterPage = match.path === '/register';

    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <FormContainer>
            <Form
                layout='vertical'
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>

                <Form.Item
                    label="Имя"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Item>

                {onRegisterPage && (
                    <Form.Item
                        name={['email']}
                        label="Email"
                        rules={[{ type: 'email' }]}>
                        <Input value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Item>
                )}

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {onRegisterPage ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Form.Item>

            </Form>
        </FormContainer>
    );
};

export default AuthPage;
