import React, { useEffect } from 'react';
import { CreateOrderWidget } from './CreateOrderWidget';
import { addQuantity, emptyCart, removeFromCart, store, subtractQuantity } from '../../providers/ShoppingCartProvider';
import styled from '@emotion/styled';
import { useMachine } from '@xstate/react';
import { Product, useStore } from '../../providers/ProductListProvider';
import { HorizontalCard } from '../components/HorizontalCard';
import { Order, orderListMachine, OrderStatus } from '../../providers/OrderListProvider';
import { Tooltip } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTheme } from '@emotion/react';
import { ChangeCartButtonGroup } from '../components/ChangeCartButtonGroup';
import { rubFormat } from '../components/Card';

const H2WithStyles = styled.h2`
    color: ${props => (props.theme.color.primary)};
    margin: 0;
`

const NoDataBlock = styled.div`
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Divider = styled.hr`
    margin: 30px 0;
`

export const CartTab = () => {
    const theme = useTheme();
    const [_state, send] = useMachine(orderListMachine);
    const { productList, takeProduct, returnProduct } = useStore();
    const cartList = store.getState().products;

    const addQuantityToCart = (id: number) => {
        store.dispatch(addQuantity(id));

        takeProduct(id);
    }

    const subtractQuantityFromCart = (id: number) => {
        store.dispatch(subtractQuantity(id));
        returnProduct(id);
    }

    const removeProductFromCart = (id: number) => {
        store.dispatch(removeFromCart(id));

        const count = cartList.find(item => item.id === id)?.count;
        returnProduct(id, count);
    }

    const handleAddOrderButtonClick = (count: number) => {
        const order: Order = {
            id: Math.random().toString(16).slice(2),
            createDate: new Date(),
            orderCount: count,
            status: OrderStatus.Created,
        }
        send({ type: 'GET_ORDER_LIST' });
        send({ type: 'ADD_ORDER', order });
        store.dispatch(emptyCart());
    }

    return <>
        {!!cartList.length &&
            <>
                {cartList.map((cart, idx) => {
                    const product: Product = productList.find((item: Product) => item.id === cart.id);
                    return <div key={idx}>
                        <HorizontalCard
                            image={product.className}
                            primaryValue={
                                <div style={{ fontSize: '20px' }}>
                                    {product.name}
                                </div>
                            }
                            secondaryValue={<Tooltip title={'Удалить'}>
                                <DeleteOutlineIcon
                                    sx={{
                                        marginTop: '10px',
                                        color: theme.color.supportive,
                                    }}
                                    onClick={() => removeProductFromCart(cart.id)}
                                />
                            </Tooltip>
                            }
                            middleValue={<ChangeCartButtonGroup
                                cartItemCount={cart.count}
                                productCount={product.count}
                                handleAddButtonClick={() => addQuantityToCart(cart.id)}
                                handleSubtractButtonClick={() => subtractQuantityFromCart(cart.id)}
                            />}
                            endValue={
                                <span style={{ fontSize: '25px', color: theme.background.primary }}>
                                    {rubFormat.format(product.cost * cart.count)}
                                </span>}
                        />
                    </div>
                })}
                <Divider />
                <CreateOrderWidget
                    handleAddOrderButtonClick={handleAddOrderButtonClick}
                />
            </>
        }
        {!cartList.length &&
            <NoDataBlock>
                <H2WithStyles>
                    Нет данных для отображения
                </H2WithStyles>
            </NoDataBlock>
        }
    </>
}