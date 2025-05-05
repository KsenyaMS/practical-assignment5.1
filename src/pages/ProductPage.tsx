import styled from '@emotion/styled';
import React from 'react';
import { Card } from '../components/Card';
import { Product, useStore } from '../../providers/ProductListProvider';
import { addQuantity, addToCart, ProductInCart, store } from '../../providers/ShoppingCartProvider';

const ProductListWithStyles = styled.div`
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    flex-wrap: wrap;
    
    gap: 15px;
`

const isProductInCart = (id: number, producnts: ProductInCart[]) => {
    return !!producnts
        .find(item => item.id === id);
}

export const ProductPage = () => {
    const { productList, takeProduct } = useStore();
    const cartList = store.getState();

    const handleAddButtonClick = (id: number, products: ProductInCart[]) => {
        const isUnique = !products.find(item => item.id === id);
        if (isUnique)
            store.dispatch(addToCart(id));

        if (!isUnique)
            store.dispatch(addQuantity(id));

        takeProduct(id);
    }

    return <ProductListWithStyles>
        {productList.map((item: Product, idx: number) =>
            <div key={idx}>
                <Card
                    image={item.className}
                    product={item}
                    isProductFinished={item.count === 0}
                    isProductInCart={isProductInCart(item.id, cartList.products)}
                    handleAddButtonClick={(id) => handleAddButtonClick(id, cartList.products)}
                />
            </div>
        )}
    </ProductListWithStyles>
}