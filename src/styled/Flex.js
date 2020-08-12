import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  ${props => props.justifyCenter && 'justify-content: center;'}
  ${props => props.alignCenter && 'align-items: center;'}
  ${props => props.alignBaseline && 'align-items: baseline;'}
  ${props => props.column && 'flex-flow: column;'}
  ${props => props.spaceBetween && 'justify-content: space-between;'}
`;

export default Flex;
