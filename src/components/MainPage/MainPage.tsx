"use client"

import { useEffect, useState } from "react";
import { useInView } from 'react-intersection-observer'

import {getProducts} from "@/actions/getProducts";
import {Review as IReview, Product, ProductResponse, CartRow} from "@/app/types";
import Cart from "@/components/Cart/Cart";
import Review from "@/components/Review/Review";
import ProductCard from "@/components/ProductCard/ProductCard";
import styles from "./MainPage.module.scss";


interface Props {
    reviews: IReview[],
    initProducts: ProductResponse
}

export default function MainPage ({ reviews, initProducts }:Props){
    const [cartItems, setCartItems] = useState<CartRow[]>([])
    const [products, setProducts] = useState<Product[]>(initProducts.data)
    const [currentPage, setCurrentPage] = useState(1)
    const [pending, setPending] = useState(false)
    const { ref, inView } = useInView()
    const maxPage = initProducts.pages

    const loadMoreProducts =  async () => {
        console.log('...loading');
        const newCurrent = currentPage + 1;
        if (newCurrent <= maxPage) {
            setCurrentPage(newCurrent);
            const newProducts = await getProducts(newCurrent, 6)
            setProducts([...products, ...newProducts.data])
            setPending(false);
        }
    }

    useEffect(() => {
        if (inView) {
            loadMoreProducts()
        }
    }, [inView])

    const clickHandler = function (id:number, quantity:number){
        const product = products.find((item) => item.id==id)
        if(product){
            const indexOfItem = cartItems.findIndex(item => item.id==id);
            if(indexOfItem!=-1){
                if(quantity>0){
                    setCartItems([ ...cartItems.slice(0, indexOfItem),
                        {'id':id, product:product, quantity: quantity},
                        ...cartItems.slice(indexOfItem+1)])
                }else{
                    setCartItems([ ...cartItems.slice(0, indexOfItem),
                        ...cartItems.slice(indexOfItem+1)])
                }
            }else{
                setCartItems([ ...cartItems, {'id':id, product:product, quantity: quantity}])
            }
        }
    }

    return (
        <main className={styles.main}>

            <h1 className={styles.title}>Тестовое задание</h1>

            <div className={styles.reviews}>
                { reviews.map((review, index)=> {
                    return <Review key={index} text={review.text}/>
                })}
            </div>

            <Cart cartItems={cartItems} setCartItems={setCartItems}/>
            <ul className={styles.list}>
                {products && products.map( product => {
                        return <li key={product.id} className={styles.listItem}>
                            <ProductCard
                                product={product}
                                setCartObject={clickHandler}
                                />
                        </li>
                    }
                )}
            </ul>
            {maxPage!=currentPage && <div className={styles.loading} ref={ref}>
                Loading...
            </div>}
        </main>
    )
}
