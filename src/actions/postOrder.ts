import {Order, OrderResponse} from "../app/types";


export async function postOrder(order:Order):Promise<OrderResponse>{
    //этот код добавит новую запись в json-server
    // fetch(`http://localhost:1337/order`,
    //     { method: 'POST',
    //       headers: {'Content-Type': 'application/json',},
    //       body: JSON.stringify(order)
    //     }).then(res=>res.json())

    const promise = new Promise<OrderResponse>((resolve, reject) => {
        if(order.cart.length==0){
            reject("пустая корзина");
        }
        // если в корзине есть товар с заданным id то вызывает ошибку
        if(order.cart.find((item) => item.id==1)){
            reject("отсутствуют товарвы");
        }
        resolve({success:1});
    }).catch( error => {return { success:0, error: error}})
    return promise;
}