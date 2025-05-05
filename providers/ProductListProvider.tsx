import { create } from 'zustand';

export type Product = {
    id: number,
    name: string,
    cost: number,
    count: number,
    className: string
}

const productList: Product[] = [
    {
        id: 0,
        name: 'Космический корабль №1',
        cost: 1000000,
        count: 10,
        className: 'Spaceship1'
    },
    {
        id: 1,
        name: 'Космический корабль №2',
        cost: 5900000,
        count: 4,
        className: 'Spaceship2'
    },
    {
        id: 2,
        name: 'Космический корабль №3',
        cost: 9900000,
        count: 13,
        className: 'Spaceship3'
    },
    {
        id: 3,
        name: 'Космический корабль №4',
        cost: 699999,
        count: 13,
        className: 'Spaceship4'
    },
    {
        id: 4,
        name: 'Космический корабль №5',
        cost: 12000000,
        count: 7,
        className: 'Spaceship5'
    },
    {
        id: 5,
        name: 'Ракета v1',
        cost: 600000,
        count: 59,
        className: 'RocketV1'
    },
    {
        id: 6,
        name: 'Ракета v3.22',
        cost: 799000,
        count: 28,
        className: 'RocketV322'
    },
]

export const useStore = create(set => ({
    productList: productList,
    takeProduct: (id: number) => set(state => ({
        productList: state.productList.map((item: Product) => item.id === id ? { ...item, count: item.count - 1 } : item)
    })),
    returnProduct: (id: number, count: number = 1) => set(state => ({
        productList: state.productList.map((item: Product) => item.id === id ? { ...item, count: item.count + count } : item)
    })),
    removeProduct: (id: number) => set(state => ({ productList: state.productList.filter((item: Product) => item.id !== id) }))
}))