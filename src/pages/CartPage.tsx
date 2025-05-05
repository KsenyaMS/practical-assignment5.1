import styled from '@emotion/styled';
import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import { useTheme } from '@emotion/react';
import { CartTab } from '../cart/CartTab';
import { OrderTab } from '../order/OrderTab';
import { Link, useSearchParams } from 'react-router-dom';

const CartListWithStyles = styled.div`
    box-sizing: border-box;
    padding: 15px;
    width: 90%;
    min-height: 80%;
    box-shadow: 0 0 10px ${props => props.theme.background.secondary};
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 20px;
`

export enum CartPageTabs {
    Cart = 'cart',
    OrderList = 'orderList',
}

export const CartPage = () => {
    const theme = useTheme();
    const [searchParams] = useSearchParams();
    const tabId = searchParams.get('tabId') || CartPageTabs.Cart;

    return <CartListWithStyles>
        <Tabs
            value={tabId}
            sx={{
                marginBottom: '10px',
                '& .MuiTabs-indicator': {
                    background: theme.background.secondary
                },
                color: theme.color.secondary
            }}
            textColor={theme.color.secondary}
        >
            <Tab
                label={'Корзина'}
                value={CartPageTabs.Cart}
                to={`/cart?tabId=${CartPageTabs.Cart}`}
                component={Link}
            />
            <Tab
                label={'Заказы'}
                value={CartPageTabs.OrderList}
                to={`/cart?tabId=${CartPageTabs.OrderList}`}
                component={Link}
            />
        </Tabs>
        {tabId === CartPageTabs.Cart &&
            <CartTab />
        }
        {tabId === CartPageTabs.OrderList &&
            <OrderTab />
        }
    </CartListWithStyles>
}