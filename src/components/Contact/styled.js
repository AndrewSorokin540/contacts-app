import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 10px;
    margin: 10px;
    border: 1px solid #aaa;
    font-size: calc(1rem + 2px);
    position: relative;
`;

const ContactValue = styled.div`
    margin-left: 10px;
`;

const Delete = styled.div`
    width: 30px;
    height: 30px;
    background-color:red;
    position: absolute;
    right: 5px;
    top: 5px;
`;

const Edit = styled.div`
    width: 30px;
    height: 30px;
    background-color:green;
    position: absolute;
    right: 5px;
    top: 45px;
`;

export { Wrapper, ContactValue, Delete, Edit };