import React from 'react';
import styled from '@emotion/styled';

const ButtonWithStyles = styled.button`
    border-radius: 5px;
    padding: 8px;
    padding-left: 12px;
    padding-right: 12px;
    box-sizing: border-box;
    border: none;
    font-weight: 400;
    font-size: 18px;
`

const ButtonWrapWithStyles = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;
`

export type ChangeCartButtonGroupProps = {
    cartItemCount: number,
    productCount: number,
    handleSubtractButtonClick: () => void,
    handleAddButtonClick: () => void,
}

export const ChangeCartButtonGroup = ({
    cartItemCount,
    productCount,
    handleSubtractButtonClick,
    handleAddButtonClick,

}: ChangeCartButtonGroupProps) => {
    return <ButtonWrapWithStyles>
        <ButtonWithStyles
            onClick={handleSubtractButtonClick}
            disabled={cartItemCount === 1}
        >
            -
        </ButtonWithStyles>
        <span style={{ fontSize: '16px' }}>{cartItemCount}</span>
        <ButtonWithStyles
            onClick={handleAddButtonClick}
            disabled={productCount === 0}
        >
            +
        </ButtonWithStyles>
    </ButtonWrapWithStyles>
}