import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './index.module.scss'
import { useAppSelector } from '@/store/hooks'
import { selectCurrClient } from '@/store/reducer/currClient'
import Image from 'next/image'


type Menu = {
    index: number,
    title: string
    path: string,
}

const menus: Menu[] = [
    {
        index: 0,
        title: '首页',
        path: '/',
    },
    // {
    //     index: 1,
    //     title: '训练营',
    //     path: '/camps'// 'https://learningos.cn/camps' //内实现 -- p0
    // },
    {
        index: 2,
        title: '项目实习',
        path: '/projects'//'https://learningos.cn/projects' // 内实现 -- p0
    },
    {
        index: 3,
        title: 'harmonyos',
        path: '/harmonyos'//'https://learningos.cn/projects' // 内实现 -- p0
    }, {
        index: 4,
        title: 'dsa-in-rust',
        path: '/dsa-in-rust'//'https://learningos.cn/projects' // 内实现 -- p0
    },
    // {
    //     index: 3,
    //     title: '任务中心',
    //     path: '/tasks' //'https://learningos.cn/tasks' //  没开源 ==》开源 -- p1
    // },
    // {
    //     index: 4,
    //     title: '问答论坛',
    //     path: '/bbs' //'https://learningos.cn/bbs'   //  开源 -- p1
    // },
    // {
    //     index: 5,
    //     title: '技术博客',
    //     path: '/blog' //'https://learningos.cn/blog'  //  开源 -- p0
    // },
    {
        index: 6,
        title: '明星学员',
        path: '/students' //'https://learningos.cn/students' // 内实现 -- p0
    },
    // {
    //     index: 7,
    //     title: '共建企业',
    //     path: '/partners'//'https://learningos.cn/partners' // 内实现 -- p1
    // },
]
const Header = () => {
    const [currentPath, setCurrentPath] = useState('')
    const currClient = useAppSelector(selectCurrClient)
    const { name, homePageInfo } = currClient
    useEffect(() => {
        if (currClient && currClient.id > 0) {
            console.log(currClient);
        }
        setCurrentPath(location.pathname)
    }, [currClient])


    return <div className={styles["layout-header"]}>
        <div className={styles["logo-wrap"]}>
            <Image width={200} height={200} src={homePageInfo?.consultUrl || ''} alt="learningOS" />
            <p className={styles['title']}>{name}</p>
        </div>
        <ul className={styles["menus"]}>
            {/* target={currentPath === menu.path ? '' : '_blank'} */}
            {menus.map((menu) => <li key={menu.index}><Link href={menu.path} onClick={() => setCurrentPath(menu.path)} className={currentPath === menu.path ? styles['active'] : ''} >{menu.title}</Link> </li>)}
        </ul>
        <div className={styles["login-wrap"]}>登录</div>
    </div>
}

export default Header