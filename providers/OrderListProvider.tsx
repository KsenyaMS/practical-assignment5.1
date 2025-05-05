import { createMachine, assign } from 'xstate';

export enum OrderStatus {
    Created = 'created',
    Work = 'work',
    Done = 'done',
}

export const getOrderStatusColor = (orderStatus: OrderStatus) => {
    if (orderStatus === OrderStatus.Created)
        return '#0cb477';

    if (orderStatus === OrderStatus.Work)
        return '#fca95d';

    if (orderStatus === OrderStatus.Done)
        return '#ff4444';

    return 'grey';
}

type ObjectFormat = {
    name: string,
    code?: string,
}

export const OrderStatusObj: { [key in OrderStatus]: ObjectFormat } = {
    [OrderStatus.Created]: { name: 'Создан' },
    [OrderStatus.Work]: { name: 'Обрабатывается' },
    [OrderStatus.Done]: { name: 'Выполнен' },
}

export const OrderStatusList: ObjectFormat[] = Object.keys(OrderStatusObj).map(key => ({
    ...OrderStatusObj[key],
    code: key as OrderStatus,
}));

export type Order = {
    id: string,
    createDate: Date,
    orderCount: number,
    status: OrderStatus,
}

export const initialValue: Order[] = !!localStorage.getItem('orderList')
    ? JSON.parse(localStorage.getItem('orderList') as string)
    : [];

export const orderListMachine = createMachine({
    context: {
        orderList: initialValue,
    },
    on: {
        GET_ORDER_LIST: {
            actions: assign({
                orderList: () => {
                    const result = !!localStorage.getItem('orderList')
                        ? JSON.parse(localStorage.getItem('orderList') as string)
                        : [];
                    return result;
                }
            })
        },
        ADD_ORDER: {
            actions: assign({
                orderList: ({ context, event }) => {
                    const result = [...context.orderList, event.order];
                    const json = JSON.stringify(result);
                    localStorage.setItem('orderList', json);
                    return result;
                }
            })
        },
        REMOVE_ORDER: {
            actions: assign({
                orderList: ({ context, event }) => {
                    const result = context.orderList
                        .filter(item => item.id !== event.id);
                    const json = JSON.stringify(result);
                    localStorage.setItem('orderList', json);
                    return result;
                }
            })
        },
        CHANGE_ORDER_STATUS: {
            actions: assign({
                orderList: ({ context, event }) => {
                    const result = context.orderList
                        .map(item => {
                            return item.id !== event.params.id
                                ? item
                                : {
                                    ...item,
                                    status: event.params.status,
                                }
                        });
                    const json = JSON.stringify(result);
                    localStorage.setItem('orderList', json);
                    return result;
                }
            })
        },
    },
});