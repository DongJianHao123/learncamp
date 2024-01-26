import { useAppSelector } from '@/store/hooks'
import styles from './index.module.scss'
import { selectCurrClient } from '@/store/reducer/currClient'
import Image from 'next/image'
import Link from 'next/link'

const links = [
    [
        { path: '/', label: '训练营' },
        { path: '/', label: '项目实习' },
        { path: '/', label: '明星学员' },
        { path: '/', label: '共建企业' },
    ],
    [
        { path: '/', label: '关于我们' },
        { path: '/', label: '联系我们' },
        { path: '/', label: '加入我们' },
        { path: '/', label: '合作伙伴' }
    ],
    [
        { path: '/', label: '服务协议' },
        { path: '/', label: '隐私政策' },
        { path: '/', label: '社区规范' }
    ]
]

const qrcodes = [
    {
        title: '社区公众号',
        src: '/images/footer-qrcode1.png'
    },
    {
        title: '社区小助手',
        src: '/images/footer-qrcode1.png'
    }
]

const filings = [
    {
        label: '鸿蒙智能座舱应用开发训练营版权所有 | 京ICP备2020036654号-3 | 京公网安备11030102011662号',
        link: '/',
    },
    {
        label: 'Copyright © 2023 Open Source Operating System. All rights reserved.',
        link: '/',
    }
]
const Footer = () => {
    const client = useAppSelector(selectCurrClient)
    const { name, homePageInfo } = client
    return <div className={styles["layout-footer"]}>
        <div className={styles['title-wrap']}>
            <Image width={100} height={100} src={homePageInfo?.consultUrl || ''} alt="logo" />
            <span className={styles['title']}>{name}</span>
        </div>
        <div className={styles['link-wrap']}>
            {links.map((linksItem, linksIndex) => {
                return <ul key={`links-item-${linksIndex}`}>
                    {linksItem.map((linkItem, linkItemIndex) => {
                        return <Link href={linkItem.path} key={`link-item-${linkItemIndex}`}>{linkItem.label}</Link>
                    })}
                </ul>
            })}
            {qrcodes.map((qrcode, qIndex) => {
                return <div key={`qrcode-wrap-${qIndex}`} className={styles['qrcode-wrap']}>
                    <div className={styles["qrcode-title"]}>{qrcode.title}</div>
                    <Image width={100} height={100} src={qrcode.src} alt={qrcode.title} />
                </div>
            })}
        </div>
        <div className={styles['filings']}>
            {filings.map((filing) => <a key={filing.label} href={filing.link}>{filing.label}</a>)}
        </div>


    </div>
}

export default Footer