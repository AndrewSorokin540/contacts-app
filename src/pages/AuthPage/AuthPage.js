import React, { useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useFetch } from 'hooks';
import { FormContainer } from './styled';

const AuthPage = ({ match }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onRegisterPage = match.path === '/register';
    const fetchUrl = onRegisterPage ? '/register' : '/login'
    const [{ response, error }, doFetch] = useFetch(fetchUrl);


    const onFinish = values => {
        console.log('Success:', values);
        doFetch({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username, email, password })
        })
    };

    useEffect(() => {
        console.log('response', response)
    }, [response])

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <FormContainer>
            <Form
                layout='vertical'
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}>
                {onRegisterPage && (
                    <Form.Item
                        label="Имя"
                        name="username"
                        rules={[{ message: 'Please input your username!' }]}>
                        <Input value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Item>
                )}

                <Form.Item
                    name={['email']}
                    label="Email"
                    rules={[{ required: true, type: 'email' }]}>
                    <Input value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
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
