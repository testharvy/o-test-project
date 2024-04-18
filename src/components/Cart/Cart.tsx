import {useState} from "react";
import { InputMask, type MaskEventDetail } from '@react-input/mask';

import {CartRow, Order} from "@/app/types";
import {postOrder} from "@/actions/postOrder";
import Popup from "@/components/Popup/Popup";
import styles from './Cart.module.scss'

interface Props{
    cartItems: CartRow[],
    setCartItems: (cartRows:CartRow[])=>void
}

export default function Cart ({ cartItems, setCartItems }:Props){
    const [showPopup, setShowPopup] = useState(false);
    const [inputDetail, setInputDetail] = useState<MaskEventDetail | null>(null);
    const [popupText, setPopupText] = useState('')

    function closePopup() {
        setPopupText('text')
        setShowPopup(false)
    }

    const showPopupWithText = function (text:string='123'){
        setPopupText(text)
        setShowPopup(true)
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
                {cartItems.map((item)=> <div key={item.id} className={styles.row}>
                    <div title={item.product.title} className={styles.itemTitle}>{item.product.title}</div>
                    <span className={styles.itemCount}>x{item.quantity}</span>
                    <span className={styles.itemPrice}>{item.product.price * item.quantity}₽</span>
                </div>)
                }
            </div>
            <form className={styles.inputWrapper} onSubmit={handleSubmit}>
                    <InputMask
                        className={styles.input}
                        mask="+7 (___) ___-__-__"
                        onMask={(event) => setInputDetail(event.detail)}
                        value={inputDetail?.value}
                        replacement={{ _: /\d/ }}
                        showMask={true}/>
                    <input type="submit" value="Заказать" className={styles.submit}/>

            </form>
            {showPopup && <Popup text={popupText} onClick={closePopup}></Popup>}

        </div>
    )
}
