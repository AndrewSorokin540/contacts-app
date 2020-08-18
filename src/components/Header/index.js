import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { LogoutOutlined, LoginOutlined, ContactsOutlined } from '@ant-design/icons';
import { CurrentUserContext } from 'contexts';
import { useLocalStorage } from 'hooks';
const { Header: AntHeader } = Layout;
const { SubMenu } = Menu;

const Header = () => {
    const [, setToken] = useLocalStorage('token');
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext);
    const { isLoggenIn, currentUser } = currentUserState;

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
                {isLoggenIn && (
                    <SubMenu icon={<ContactsOutlined />} title={currentUser.email}>
                        <Menu.Item icon={<LogoutOutlined />} key="1" onClick={() => onExit()}>Выйти</Menu.Item>
                    </SubMenu>
                )}
                {!isLoggenIn && <Menu.Item icon={<LoginOutlined />} key="2"><Link to='/login'>Вход</Link></Menu.Item>}
                {!isLoggenIn && <Menu.Item icon={<LoginOutlined />} key="3"><Link to='/register'>Зарегистрироваться</Link></Menu.Item>}
            </Menu>
        </AntHeader>
    )
}

export default Header;