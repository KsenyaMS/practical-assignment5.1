
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Product } from '../../providers/ProductListProvider';
import { MyButton } from './Button';
import { useNavigate } from 'react-router-dom';
import '../styles/imageStyles.css';

const CardWrapWithStyles = styled.div`
    height: 350px;
    width: 235px;
    background: ${props => (props.theme.background.layout)};
    border-radius: 8px;
    box-sizing: border-box;
    box-shadow: 0 0 10px ${props => (props.theme.background.secondary)};
`

const ImageWrapWithStyles = styled.div`
    height: 60%;
    width: 100%;
`

const ContentWrapWithStyles = styled.div`
    height: 40%;
    width: 100%;
    background: ${props => (props.theme.background.layout)};
    box-sizing: border-box;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px;
`

const H2WithStyles = styled.h2`
    color: ${props => (props.theme.color.primary)};
    margin: 0;
`

const H4WithStyles = styled.h4`
    color: ${props => (props.theme.color.secondary)};
    margin: 0;
`

const H5WithStyles = styled.h5`
    color: ${props => (props.theme.color.supportive)};
    margin: 0;
`

const ButtonWrapWithStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 5px;
`

export const rubFormat = new Intl.NumberFormat('ru-Ru', {
    style: 'currency',
    currency: 'RUB',
})

export const Card = ({
    image,
    product,
    isProductInCart,
    isProductFinished,
    handleAddButtonClick
}: {
    image?: string,
    product: Product,
    isProductInCart: boolean,
    isProductFinished: boolean,
    handleAddButtonClick: (id: number) => void
}) => {
    const navigate = useNavigate();
    const [isTake, setIsTake] = useState<boolean>(false);

    return <CardWrapWithStyles>
        <ImageWrapWithStyles className={image} />
        <ContentWrapWithStyles>
            <H2WithStyles>
                {rubFormat.format(product.cost)}
            </H2WithStyles>
            <H4WithStyles>
                {product.name}
            </H4WithStyles>
            {!isProductFinished &&
                <H5WithStyles>
                    осталось {product.count} шт
                </H5WithStyles>
            }
            {isProductFinished &&
                <H5WithStyles>
                    товар закончился
                </H5WithStyles>
            }
            <ButtonWrapWithStyle>
                {!isTake && !isProductFinished &&
                    <MyButton
                        text='В корзину'
                        props={{ large: true }}
                        onClick={() => {
                            handleAddButtonClick(product.id);
                            setIsTake(true);
                        }}
                    />
                }
                {(isTake || (isProductInCart && isProductFinished)) &&
                    <MyButton
                        text={'В корзине'}
                        onClick={() => navigate(`/cart`)}
                        props={{ large: true }}
                    />
                }
            </ButtonWrapWithStyle>
        </ContentWrapWithStyles>
    </CardWrapWithStyles>;
}