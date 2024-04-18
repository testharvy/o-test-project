import {Product} from "@/app/types";
import ProductCounter from "@/components/ProductCounter/ProductCounter";
import styles from './ProductCard.module.scss'
import Image from "next/image";


interface Props{
    product: Product,
    setCartObject: (id: number, quantity: number)=>void,
}

export default function ProductCard ({ product, setCartObject}:Props){
    const {image_url, title, description, price} = product;

    return (
        <div  className={styles.block}>
            {/*<img className={styles.img} src={image_url} alt={title}/>*/}

                <Image
                    className={styles.img}
                    src={image_url}
                    alt={title}
                    height={800}
                    width={600}/>


            <h4 title={title} className={styles.title}>{title}</h4>
            <div title={description} className={styles.description}>{description}</div>
            <div className={styles.price}>цена {price}₽</div>
            <ProductCounter productId={product.id} setCartObject={setCartObject}/>
        </div>
    )
}
