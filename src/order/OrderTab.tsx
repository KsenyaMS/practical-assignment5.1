import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useMachine } from '@xstate/react';
import { HorizontalCard } from '../components/HorizontalCard';
import { getOrderStatusColor, orderListMachine, OrderStatusObj } from '../../providers/OrderListProvider';
import { useTheme } from '@emotion/react';
import { rubFormat } from '../components/Card';
import { useSearchParams } from 'react-router-dom';
import { CartPageTabs } from '../pages/CartPage';

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

const EndValueWrapWithStyles = styled.div`
    color: white;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 3px 6px;
`

const dateFormatterRu = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric', // Год
    month: 'long', // Полное название месяца
    day: 'numeric', // День месяца
});

export const OrderTab = () => {
    const theme = useTheme();
    const [state, send] = useMachine(orderListMachine);
    const [searchParams] = useSearchParams();
    const tabId = searchParams.get('tabId');
    const orderList = state.context.orderList;

    useEffect(() => {
        if (tabId !== CartPageTabs.OrderList)
            return;

        send({ type: 'GET_ORDER_LIST' });
    }, [tabId])

    return <>
        {!!orderList.length &&
            <>
                {orderList.map((order, idx) => {
                    return <div key={idx}>
                        <HorizontalCard
                            cardStyles={{
                                height: '80px',
                                boxShadow: '0 0 1px grey'
                            }}
                            primaryValue={
                                <div style={{ color: theme.color.primary, fontSize: '25px' }}>
                                    {rubFormat.format(order.orderCount)}
                                </div>
                            }
                            secondaryValue={
                                <div style={{ color: theme.color.supportive }}>
                                    {dateFormatterRu.format(new Date(order.createDate))}
                                </div>
                            }
                            endValue={
                                <EndValueWrapWithStyles style={{ background: getOrderStatusColor(order.status) }}>
                                    {OrderStatusObj[order.status].name}
                                </EndValueWrapWithStyles>
                            }
                        />
                    </div>
                })}
            </>
        }
        {
            !orderList.length &&
            <NoDataBlock>
                <H2WithStyles>
                    Нет данных для отображения
                </H2WithStyles>
            </NoDataBlock>
        }
    </>
}