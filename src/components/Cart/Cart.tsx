import {useEffect, useState} from "react";
import { InputMask, type MaskEventDetail } from '@react-input/mask';

import {CartRow, Order} from "@/app/types";
import {postOrder} from "@/actions/postOrder";
import Popup from "@/components/Popup/Popup";
import styles from './Cart.module.scss'
import {MaskEventHandler} from "@react-input/mask/types";
import {getPhone, setPhone} from "@/utils/storage";


interface CartProps{
    cartItems: CartRow[],
    setCartItems: (cartRows:CartRow[])=>void
}
interface CartRowProps{
    item: CartRow,
    onClick: (id:number)=>void
}


function CartRowComponent ({ item, onClick }:CartRowProps){
    return(
        <div key={item.id} className={styles.row}>
            <div title={item.product.title} className={styles.itemTitle}>{item.product.title}</div>
            <span className={styles.itemCount}>x{item.quantity}</span>
            <span className={styles.itemPrice}>{item.product.price * item.quantity}₽</span>
            <span className={styles.delete} onClick={()=>onClick(item.id)}>X</span>
        </div>
    )
}


export default function Cart ({ cartItems, setCartItems }:CartProps){
    const [showPopup, setShowPopup] = useState(false);
    const [inputDetail, setInputDetail] = useState<MaskEventDetail | null>(null);
    const [popupText, setPopupText] = useState('')

    useEffect(() => {
        const phoneData = getPhone();
        setInputDetail(phoneData);
    }, []);

    function closePopup() {
        setPopupText('text')
        setShowPopup(false)
    }

    const showPopupWithText = function (text:string=''){
        setPopupText(text)
        setShowPopup(true)
    }

    function deleteCartRow(id:number) {
        setCartItems([...cartItems].filter((row)=> row.id!=id))
    }

    const handleOnMask:MaskEventHandler = function (event){
        setPhone(event.detail.toString())
        setInputDetail(event.detail)
    }

    const handleSubmit = async function(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(inputDetail){
            if (!inputDetail.isValid){
                showPopupWithText('Неверный номер')
            }else{
                const order:Order = {  phone: `7${inputDetail.input}`, cart: cartItems}
                const response = await postOrder(order);
                if(response.success==1){
                    showPopupWithText('Ваш заказ отправлен')
                    setCartItems([])
                }else{
                    showPopupWithText(`Ошибка: ${response.error}`)
                }
            }
        }else{
            showPopupWithText('Введите номер')
        }
    }


    return (
        <div  className={styles.block}>
            <h4 className={styles.title}>Добавленный товар</h4>
            <div className={styles.rows}>
                { cartItems.map( (item) => {
                    return <CartRowComponent key={item.id} item={item} onClick={deleteCartRow}/>})
                }
            </div>
            <form className={styles.inputWrapper} onSubmit={handleSubmit}>
                    <InputMask
                        className={styles.input}
                        mask="+7 (___) ___-__-__"
                        onMask={handleOnMask}
                        value={inputDetail?.value}
                        replacement={{ _: /\d/ }}
                        showMask={true}/>
                    <input type="submit" value="Заказать" className={styles.submit}/>

            </form>
            {showPopup && <Popup text={popupText} onClick={closePopup}></Popup>}

        </div>
    )
}
