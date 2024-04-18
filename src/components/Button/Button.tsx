import {ReactNode} from "react";
import styles from './Button.module.scss'

type ButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children?: ReactNode,
    extraClassName?: string
}

export default function Button({onClick,children, extraClassName=''}:ButtonProps ){
    return(
        <div className={`${styles.wrapper} ${styles[extraClassName]}`} >
            <button className={styles.button} onClick={onClick}>{children}</button>
        </div>
    )
}