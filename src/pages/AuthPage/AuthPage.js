import React, { useState, useEffect, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { useFetch, useLocalStorage } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { getUserFromToken } from 'utils';
import { FormContainer } from './styled';

const AuthPage = ({ match }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onRegisterPage = match.path === '/register';
    const fetchUrl = onRegisterPage ? '/register' : '/login'
    const [{ response }, doFetch] = useFetch(fetchUrl);
    const [, setToken] = useLocalStorage('token');
    const [, setCurrentUserState] = useContext(CurrentUserContext);

    const onFinish = () => {
        doFetch({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ username, email, password })
        })
    };

    useEffect(() => {
        if (response && response.accessToken) {
            const { accessToken } = response;
            setToken(accessToken);

            const [userId] = getUserFromToken(accessToken)
            setCurrentUserState(state => ({
                ...state,
                loading: false,
                isLoggenIn: true,
                currentUser: {
                    ...state.currentUser,
                    email,
                    username,
                    id: userId
                }
            }))
        }
    }, [response, setToken, email, username, setCurrentUserState])

    return (
        <FormContainer>
            <Form
                layout='vertical'
                name="basic"
                onFinish={onFinish}>
                {onRegisterPage && (
                    <Form.Item
                        label="Имя"
                        name="username"
                        rules={[{ message: 'Please input your username!' }]}>
                        <Input size="large" value={username} onChange={e => setUsername(e.target.value)} />
                    </Form.Item>
                )}

                <Form.Item
                    name={['email']}
                    label="Email"
                    rules={[{ required: true, type: 'email' }]}>
                    <Input size="large" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password size="large" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Item>

                <Form.Item>
                    <Button size="large" block type="primary" htmlType="submit">
                        {onRegisterPage ? 'Зарегистрироваться' : 'Войти'}
                    </Button>
                </Form.Item>

            </Form>
        </FormContainer>
    );
};

export default AuthPage;
