
import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

const HorizontalCardWrapWithStyles = styled.div`
    height: 130px;
    width: 100%;
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
`

const ImageWrapWithStyles = styled.div`
    width: 10%;
    box-sizing: border-box;
    border-radius: 8px;
`

const ContentWrapWithStyles = styled.div`
    box-sizing: border-box;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
`

export type HorizontalCardProps = {
    image?: string,
    primaryValue: string | ReactElement<any, any>,
    secondaryValue?: string | ReactElement<any, any>,
    middleValue?: string | ReactElement<any, any>,
    endValue?: string | ReactElement<any, any>,
    cardStyles?: { [key: string]: string },
}

export const HorizontalCard = ({
    image,
    primaryValue,
    secondaryValue,
    middleValue,
    endValue,
    cardStyles,
}: HorizontalCardProps) => {

    return <HorizontalCardWrapWithStyles style={{ ...cardStyles }}>
        {image &&
            <ImageWrapWithStyles className={image} />
        }
        <ContentWrapWithStyles style={{ width: image ? '90%' : '100%' }}>
            <div style={{ height: '100%' }}>
                {primaryValue}
                {secondaryValue && secondaryValue}
            </div>
            {middleValue && middleValue}
            <div>
                {endValue && endValue}
            </div>
        </ContentWrapWithStyles>
    </HorizontalCardWrapWithStyles>;
}