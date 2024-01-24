'use client'
import { Button, Menu, MenuProps } from 'antd'
import styles from './index.module.scss'
import Link from 'next/link'
import { IClient } from '@/types/client'
import Image from 'next/image'
import { useState } from 'react'
import { MessageOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { useRouter } from 'next/navigation'
import JobCard from '../JobCard'
interface IProps {
    client: IClient
}
type MenuItem = Required<MenuProps>['items'][number];

const process = [
    {
        label: '学习教材',
        path: 'textbook'
    },
    {
        label: '课程直播',
        path: 'live'
    },
    {
        label: '互动答疑',
        path: 'bbs'
    },
    {
        label: '课程回放',
        path: 'playback'
    },
    {
        label: '考核合格',
        path: 'test'
    },
    {
        label: '晋级排行榜',
        path: 'standings'
    }
]
const ClientHomePage = ({ client }: IProps) => {
    const { jobs = [], camps = [] } = client

    const [currCampName, setCurrCampName] = useState(camps[0].name)

    const currCamp = camps.find(c => c.name === currCampName)
    const router = useRouter()


    const items: MenuItem[] = camps.map((camp) => {
        const { id, title, name, courses = [], projects = [] } = camp
        const children: MenuItem[] = courses?.concat(projects).map((course, index) => {
            const { title, courseId } = course
            return {
                key: courseId,
                type: 'group',
                label: <Link className={styles['link']} href={`/${client.clientName}/camp/${name}/stage/${index}`}>{title}</Link>
            }
        })
        return {
            key: id,
            icon: '',
            label: title,
            children: children
        }
    })

    const handleClickRegister = () => {
        router.push(`/${client.clientName}/camp/${currCamp?.name}/register`)
    }
    return <div className={styles['client-home-container']}>
        <Menu
            className={styles['sider-bar']}
            mode="inline"
            defaultOpenKeys={camps.map((camp) => `${camp.id}`)}
            theme="dark"
            items={items}
        />
        <div className={styles["content"]}>
            <div className={styles["title-wrap"]}>
                <div className={styles['left']}>
                    <div className={styles["title"]}>{currCamp?.title}</div>
                    <div className={styles["desc"]}>{currCamp?.description}</div>
                </div>
                <div className={styles['right']}>
                    <Image className={styles['image']} src={currCamp?.logo || ''} alt="" width={100} height={200} />
                </div>
            </div>
            <div className={styles["steps"]}>
                <div className={styles["general-title"]}>成长路径</div>
                <div className={styles["step"]}>
                    <div className={styles["title"]}><MessageOutlined />初步了解训练营</div>
                    <div className={styles["step-content"]}>
                        <ul>
                            <li>2024年  第一期鸿蒙智能座舱应用开发训练营即将开营，学习阶段为2月19日至4月28日，共11周</li>
                            <li>全部课程线上学，仿腾讯会议互动教室，三阶段依次晋级，一期学习周期不超过2个月为宜</li>
                            <li>基于全浏览器实训教学，统一学习环境和代码提交记录，促进公平评分</li>
                            <li>课程包括鸿蒙ArkTS语言基础、DevEco Studio开发工具、ArkUI系统组件、HarmonyOS开发框架、App Data管理、Stage模型、AGC应用上架等</li>
                        </ul>
                    </div>
                </div>
                <div className={styles["step"]}>
                    <div className={styles["title"]}><UsergroupAddOutlined />快速加入训练营</div>
                    <div className={styles["step-content"]}>
                        <Button type='primary' className={styles["register-btn"]} onClick={handleClickRegister}>点击报名</Button>
                    </div>
                </div>
                {currCamp?.courses?.map((course, courseIndex) => {
                    return <div key={`camp-step-${courseIndex}`} className={styles['step']}>
                        {
                            courseIndex !== 3 ? <>
                                <div className={styles["title"]}>
                                    <div className={styles['step-num-icon']}>{courseIndex}</div>
                                    {`${course.title}`}
                                </div>
                                <div className={styles["step-content"]}>
                                    <ul className={styles['process']}>
                                        {process.map((p, processIndex) => {
                                            return <li key={`process-${processIndex}`} className={styles['process-item']} >
                                                <Link target='_blank' href={`/${client.clientName}/camp/${currCamp.name}/stage/${courseIndex}?tab=${p.path}`}>{processIndex === process.length - 1 && courseIndex > 0 ? `第${courseIndex}阶段${p.label}` : p.label}</Link>
                                                {processIndex < process.length - 1 && <Image width={60} height={8} src={'/images/arrow.png'} alt='arrow' />}
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </> : <>
                                <div className={styles["title"]}>
                                    <div className={styles['step-num-icon']}>{courseIndex}</div>
                                    项目实习
                                </div>
                                <div className={styles["step-content"]}>
                                    <ul className={styles['projects']}>
                                        <li className={styles['project']} >
                                            <Link target='_blank' href={`/${client.clientName}/camp/${currCamp.name}/stage/${courseIndex}`}>{course.title}</Link>
                                        </li>
                                    </ul>
                                    <ul className={styles['jobs']}>
                                        {jobs.map((job, jobIndex) => {
                                            return <JobCard haveBorder key={`job-${jobIndex}`} job={job} />
                                        })}
                                    </ul>
                                </div>
                            </>
                        }

                    </div>
                })}
            </div>
        </div>

    </div>
}

export default ClientHomePage