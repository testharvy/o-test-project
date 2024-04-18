import {createPortal} from "react-dom";

import Button from "@/components/Button/Button";
import styles from "./Popup.module.scss"

interface Props{
    text: string,
    onClick: ()=>void,
}

export default function Popup({text, onClick}:Props){

    return(
        <>
            { createPortal(
                <div className={styles.bg} onClick={()=>onClick()}>
                    <div className={styles.popup}>
                        <div className={styles.text}>{text}</div>
                        <Button extraClassName={'-popup'}>Ok</Button>
                    </div>
                </div>,
                document.body
            )
            }
        </>
    )
}