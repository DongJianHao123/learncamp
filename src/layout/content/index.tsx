import { ReactNode } from "react"
import styles from './index.module.scss'

const Content = (props: { children: ReactNode }) => {
    return <div className={styles["layout-content"]}>
        {props.children}
    </div>
}

export default Content