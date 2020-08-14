import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { CurrentUserContext } from 'contexts';
import { useLocalStorage } from 'hooks';
const { Header: AntHeader } = Layout;

const Header = () => {
    const [, setToken] = useLocalStorage('token');
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
    const { isLoggenIn } = currentUserState;

    const onExit = () => {
        setCurrentUserState({
            currentUser: null,
            isLoggenIn: false,
            loading: false
        });
        setToken('');
    }
    return (
        <AntHeader>
            <Menu theme="dark" mode="horizontal">
                <Menu.Item key="1">{isLoggenIn ? 'Залогинен' : 'Не залогинен'}</Menu.Item>
                <Menu.Item key="2"><Link to='/'>Контакты</Link></Menu.Item>
                <Menu.Item key="3" onClick={() => onExit()}>Выйти</Menu.Item>
                <Menu.Item key="4"><Link to='/login'>Вход</Link></Menu.Item>
                <Menu.Item key="5"><Link to='/register'>Зарегистрироваться</Link></Menu.Item>
            </Menu>
        </AntHeader>
    )
}

export default Header;