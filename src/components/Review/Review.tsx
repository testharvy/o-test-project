import parse from 'html-react-parser'
import DOMPurify from "isomorphic-dompurify";

import styles from './Review.module.scss'

interface Props{
    text: string
}

export default function Review ({text}:Props){
    return (
        <div className={styles.block}>
            {parse(DOMPurify.sanitize(text))}
        </div>
    )
}
