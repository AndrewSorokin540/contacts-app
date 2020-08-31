import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { useFetch, useLocalStorage } from 'hooks';
import { CurrentUserContext } from 'contexts';
import { setAuthorized, loadingDone } from 'actions';
import { getUserFromToken } from 'utils';
import { TextCenter } from 'styled';
import { FormContainer } from './styled';

const { Title } = Typography;

const AuthPage = ({ match }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onRegisterPage = match.path === '/register';
    const fetchUrl = onRegisterPage ? '/register' : '/login'
    const [{ response }, doFetch] = useFetch(fetchUrl);
    const [, setToken] = useLocalStorage('token');
    const [{ isLoggenIn }, dispatch] = useContext(CurrentUserContext);

    const onFinish = () => {

        doFetch({
            method: 'POST',
            body: JSON.stringify({ email, password })
        })
    };

    useEffect(() => {
        if (!response) return;

        const [id] = getUserFromToken(response.accessToken)
        setToken(response.accessToken);
        dispatch(setAuthorized({ email, id }));
        dispatch(loadingDone());

    }, [response, setToken, email, dispatch]);

    if (isLoggenIn) return <Redirect to='/' />

    return (
        <FormContainer>
            <Title level={2}>
                <TextCenter>
                    {onRegisterPage ? 'Зарегистрироваться' : 'Войти'}
                </TextCenter>
            </Title>
            <Link to={onRegisterPage ? '/login' : '/register'}>
                <TextCenter>
                    {onRegisterPage ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
                </TextCenter>
            </Link>
            <Form
                layout='vertical'
                name="basic"
                onFinish={onFinish}>

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
