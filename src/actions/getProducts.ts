import { ProductResponse } from "../app/types";

export async function getProducts(page:number, page_size:number):Promise<ProductResponse>{
    return fetch(`http://localhost:1337/products?_page=${page}&_per_page=${page_size}`,
    { headers: {'Content-Type': 'application/json',},
    }).then(res=>res.json())
}