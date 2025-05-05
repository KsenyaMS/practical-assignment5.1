import React from 'react';
import styled from '@emotion/styled';
import { Grid, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ThemeType, useMyThemeProvider } from '../../providers/ThemeProvider';
import { MyButton } from './Button';
import { UserType, useUserType } from '../../providers/AuthorizationProvider';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const HeaderWithStyles = styled.div`
  background: ${props => (props.theme.background.primary)};
  color: ${props => (props.theme.color.heading)};
  width: 100vw;
  height: 100px;
  box-sizing: border-box;
  padding: 10px;
  padding-right: 20px;
  padding-left: 20px;
  margin-bottom: 10px;
  box-shadow: 0 2px 9px ${props => (props.theme.background.secondary)};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ContentWrap = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 10px;
  gap: 20px;
`

const LinkWithStyles = styled(Link)`
  color: ${props => (props.theme.color.heading)};
  font-size: 1.1rem;
  text-decoration: none;
`

export const Header = () => {
    const { theme, handleThemeChange } = useMyThemeProvider();
    const myTheme = useTheme();

    const [userType, setUserType] = useUserType();

    return <HeaderWithStyles>
        <ContentWrap style={{ justifyContent: 'flex-start' }}>
            <LinkWithStyles
                to={'/table'}
            >
                Список товаров
            </LinkWithStyles>
            {userType === UserType.User &&
                <LinkWithStyles
                    to={'/cart'}
                >
                    Корзина
                </LinkWithStyles>
            }
        </ContentWrap>
        <ContentWrap>
            <RadioGroup
                row
                defaultValue={theme}
            >
                <FormControlLabel
                    value={ThemeType.Light}
                    control={<Radio />}
                    label={'Светлая тема'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                />
                <FormControlLabel
                    value={ThemeType.Dark}
                    control={<Radio />}
                    label={'Темная тема'}
                    onChange={(e) => handleThemeChange(e.target.value)}
                />
            </RadioGroup>
            <Grid sx={{ width: '20%' }}>
                {userType === UserType.Guest &&
                    <MyButton
                        text='Войти'
                        props={{ large: true }}
                        onClick={() => setUserType(UserType.User)}
                    />
                }
                {userType === UserType.User &&
                    <MyButton
                        text='Выйти'
                        props={{ large: true }}
                        onClick={() => setUserType(UserType.Guest)}
                    />
                }
            </Grid>
        </ContentWrap>
    </HeaderWithStyles>

}