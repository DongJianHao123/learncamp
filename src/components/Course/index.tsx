'use client'
import { RightOutlined, UserOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
import Image from 'next/image'
import { Button } from 'antd'
import { useState } from 'react'
interface IProps {
    course: ICourse
}
interface ITabRenderProps {
    display: boolean
}
const Course = (props: IProps) => {
    const { course } = props
    const [tabVal, setTabVal] = useState<number>(1)
    const { title, info, introduction, teacher, textbooks, summary, coverUrl } = course

    const Tabs = [
        {
            value: 1,
            label: '课程介绍',
            Render: ({ display }: ITabRenderProps) => {
                return <div style={display ? {} : { display: 'none' }}>课程介绍</div>
            }
        },
        {
            value: 2,
            label: '学习教材',
            Render: ({ display }: ITabRenderProps) => {
                return <div style={display ? {} : { display: 'none' }}>学习教材</div>
            }
        },
        {
            value: 3,
            label: '课程回放',
            Render: ({ display }: ITabRenderProps) => {
                return <div style={display ? {} : { display: 'none' }}>课程回放</div>
            }
        },
        {
            value: 4,
            label: '报名学员',
            Render: ({ display }: ITabRenderProps) => {
                return <div style={display ? {} : { display: 'none' }}>报名学员</div>
            }
        },
        {
            value: 5,
            label: '组队信息（可加入已有队伍）',
            Render: ({ display }: ITabRenderProps) => {
                return <div style={display ? {} : { display: 'none' }}>组队信息（可加入已有队伍）</div>
            }
        },
    ]

    return <div className={styles['stage-container']}>
        <div className={styles["header-wrap"]}>
            <div className={styles["top"]}>
                <div className={styles["top-left"]}>
                    <div className={styles["title"]}>{title}</div>
                    <ul className={styles["summary"]}>
                        {summary?.split(";").map((text: string, index: number) => {
                            return <li key={index}><RightOutlined style={{ marginRight: '1rem' }} />{text}</li>
                        })}
                    </ul>
                    <div className={styles["teachers"]}>
                        <UserOutlined />  讲师：{teacher}
                    </div>
                </div>
                <div className={styles["top-right"]}>
                    <Image src={coverUrl} width={400} height={200} alt="cover" />
                </div>
            </div>
            <div className={styles['bottom']}>
                <Button type='primary'>加入学习</Button>
                <Button >创建队伍</Button>
            </div>
        </div>
        <div className={styles["tabs"]}>
            <ul className={styles["title-bar"]}>
                {Tabs.map(t => <li key={`tab-${t.value}`} onClick={() => setTabVal(t.value)}>{t.label}</li>)}
            </ul>
            {Tabs.map(t => {
                const { Render } = t
                return <Render display={tabVal === t.value} key={`tab-render-${t.value}`} />
            })}
        </div>

    </div>
}

export default Course