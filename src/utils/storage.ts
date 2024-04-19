import {CartRow} from "@/app/types";

export const getPhone = () => {
    const item = localStorage.getItem('phone');
    if (item) {
        try {
            return JSON.parse(item);
        } catch (e) {
            console.error(`Ошибка при чтении из localStorage:`, e);
            return null;
        }
    }
    return null;
};

export const setPhone = (phone:string) => {
    try {
        const item = JSON.stringify(phone);
        localStorage.setItem('phone', item);
    } catch (e) {
        console.error(`Ошибка при записи в localStorage:`, e);
    }
};


export const getCart = () => {
    const item = localStorage.getItem('cart');
    if (item) {
        try {
            return JSON.parse(item);
        } catch (e) {
            console.error(`Ошибка при чтении из localStorage:`, e);
            return null;
        }
    }
    return null;
};

export const setCart = (cart:CartRow[]) => {
    try {

        const item = JSON.stringify(cart);
        localStorage.setItem('cart', item);
    } catch (e) {
        console.error(`Ошибка при записи в localStorage:`, e);
    }
};