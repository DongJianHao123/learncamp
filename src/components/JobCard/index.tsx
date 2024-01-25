

import { IJob } from '@/core/types/job'
import Link from 'next/link'
import styles from './index.module.scss'

interface Iprops {
    job: IJob
    haveBorder?: boolean
}

const JobCard = (props: Iprops) => {
    const { name, partner, id, requirement, salary } = props.job
    return <Link href={`/job/${id}`} className={styles["job-card"]} style={props.haveBorder ? { border: '1px solid #6C42E780' } : {}}>
        <span className={styles["job-title"]}>{name}</span>
        <div className={styles["partner-salary"]}>
            <span className={styles["partner"]}>{partner?.name}</span>
            <span className={styles["salary"]}>{`${salary.min}-${salary.max}K`}</span>
        </div>
        <span className={styles["requirement"]}>{requirement}</span>
    </Link>
}

export default JobCard