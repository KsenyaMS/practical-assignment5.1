import React from 'react';
import { Header } from './Header';
import styled from '@emotion/styled';

const LayoutWrapWithStyles = styled.div`
    height: 100vh;
    width: 100vw;
    background: ${props => (props.theme.background.layout)};
    overflow-x: hidden;
    font-family: 'Trebuchet MS', Helvetica, sans-serif;
`

export const Layout = ({ children }: { children?: React.ReactNode }) => {

  return <LayoutWrapWithStyles>
    <Header />
    {children}
  </LayoutWrapWithStyles>
}