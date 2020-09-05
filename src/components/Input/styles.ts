import styled from 'styled-components';

export const Container = styled.div<{ focused: boolean; isFilled: boolean }>`
  background: #232129;
  border-radius: 10px;
  transition: border 0.2s;
  border: 2px solid ${props => (props.focused ? '#ff9000' : '#232129')};
  padding: 16px;
  width: 100%;
  color: #666360;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    transition: color 0.2s;
    ${props => (props.focused || props.isFilled) && 'color : #ff9000;'};
  }
`;
