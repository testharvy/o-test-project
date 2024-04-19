import {useState} from "react";

import Button from "../Button/Button";
import styles from "./ProductCounter.module.scss"

type Props = {
    productId: number
    quantity: number
    setCartObject: (id: number, quantity: number)=>void,
}

export default function ProductCounter ({productId, quantity, setCartObject=(id,quantity)=>{}}:Props){
    // const [count, setCount] = useState(quantity)

    const changeHandler = function (event: React.ChangeEvent<HTMLInputElement>){
        let newCount = parseInt(event.target.value);
        if(isNaN(newCount)){
            newCount=0;
        }
        if(newCount<0){
            newCount=0;
        }
        if(newCount>99){
            newCount=99;
        }
        setCartObject(productId, newCount);
    }

    const clickHandler = function (newCount:number){
        setCartObject(productId, newCount);
    }

    return (
        <div className={styles.wrapper}>
            { quantity==0 ?
                <Button extraClassName={'-buy'} onClick={()=>clickHandler(1)}>Купить</Button>
                :
                <>
                    <Button extraClassName={'-plus'} onClick={()=>clickHandler(quantity-1)}> - </Button>
                    <input
                        pattern="[0-9]*"
                        onChange={(event)=>changeHandler(event)}
                        value={quantity}
                        className={styles.input}
                        min={0}
                        max={99}
                        type="number"/>
                    <Button extraClassName={'-plus'} onClick={()=>clickHandler(quantity+1)}> + </Button>
                </>
            }
        </div>
    )
}
