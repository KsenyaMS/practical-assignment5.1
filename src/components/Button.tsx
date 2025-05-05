import React from 'react';
import styled from '@emotion/styled';

const ButtonWithStyles = styled.button`
  background: ${props => (props.theme.background.secondary)};
  color: ${props => (props.theme.color.heading)};
  width: ${props => (props.large ? '100%' : '80%')};
  height: ${props => (props.large ? '50px' : '30px')};
  border: none;
  box-shadow: 0 0 5px ${props => (props.theme.background.secondary)};
  padding: 5px;
  border-radius: 6px;
  cursor: pointer;
`

export const MyButton = ({
    text,
    onClick,
    props
}: {
    text: string,
    onClick: () => void,
    props: any
}) => {

    return <ButtonWithStyles
        onClick={onClick}
        {...props}
    >
        {text}
    </ButtonWithStyles>

}