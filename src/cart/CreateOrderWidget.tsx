import React from 'react';
import { ProductInCart, store, } from '../../providers/ShoppingCartProvider';
import { Product, useStore } from '../../providers/ProductListProvider';
import styled from '@emotion/styled';
import { rubFormat } from '../components/Card';
import { MyButton } from '../components/Button';

const H2WithStyles = styled.h2`
    color: ${props => (props.theme.color.primary)};
    margin: 0;
`

const TotalWrapWithStyles = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const ButtonWrapWithStyles = styled.div`
    width: 13%;
    float: right;
`

const getOrderCount = (productList: Product[], cartList: ProductInCart[]) => {
    const result = cartList.map(cartItem => {
        const cost = productList.find(product => product.id === cartItem.id)?.cost;
        return cost
            ? cartItem.count * cost
            : 0;
    }).reduce((acc: number, curVal: number) => {
        return acc + curVal;
    }, 0)

    return result;
}

export const CreateOrderWidget = ({ handleAddOrderButtonClick }: { handleAddOrderButtonClick: (count: number) => void }) => {
    const { productList } = useStore();
    const cartList = store.getState().products;

    const count = getOrderCount(productList, cartList);

    return <>
        <TotalWrapWithStyles>
            <H2WithStyles>
                Итого
            </H2WithStyles>
            <H2WithStyles>
                {rubFormat.format(count)}
            </H2WithStyles>
        </TotalWrapWithStyles>
        <ButtonWrapWithStyles>
            <MyButton
                text={'Оформить заказ'}
                onClick={() => handleAddOrderButtonClick(count)}
                props={{ large: true }}
            />
        </ButtonWrapWithStyles>
    </>
}