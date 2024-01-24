'use client'
import { Genders } from '@/common/constants'
import { REGIONS } from '@/common/regions'
import styles from '@/styles/pages/register/index.module.scss'
import { IRegistration } from '@/types/register'
import { Breadcrumb, Button, Cascader, Checkbox, Form, Input, Radio } from 'antd'
interface IProps {
    params: {
        clientName: string
        campName: string
    }
}

const WORK_STATES = ['在校大学生', '在校硕士研究生', '在校博士研究生', '工作1-3年', '工作3-5年', '工作5年以上', '工作10年以上']

const GOOD_AT_OPTIONS = [
    '硬件/驱动/系统软件开发（汇编/C语言/Linux/Drivers/KVM/Hypervisor）',
    '嵌入式开发（RISC-V/ARM/MCU/RTOS）',
    '服务器/运维/数据库（Go/Java/Python/C++/Docker）',
    'Web/移动开发（React/Vue/Nodejs/Spring/iOS/Android)',
    '算法/大数据/人工智能/机器人/AIoT（MapReduce/TensorFlow/ROS/OpenCV）',
    '自动驾驶/智能网联车/新能源（V2X/AUTOSAR/OTA/CAN/FCEV）',
    '网络/分布式系统/区块链（HTTP3/libp2p/web3）',
    '音视频/直播/VR/AR（WebRTC/FFmpeg/RTMP/SRS）',
    '其他'
]
const Register = (props: IProps) => {
    const { clientName, campName } = props.params
    const handleRegister = (registration: IRegistration) => {
        console.log(registration);

    }
    const onFinish = (values: any) => {
        handleRegister({ ...values, id: 0, clientName, campName               })

    }
    return <div className={styles["register-container"]}>
        <Breadcrumb
            items={[
                {
                    title: <a>鸿蒙开发工程师培训</a>,
                },
                {
                    title: <a>2024第一期训练营</a>
                },
                {
                    title: '报名',
                },
            ]}
        />
        <h4 className={styles['form-title']}>2024第一期训练营</h4>
        <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 10, offset: 0 }}
            // style={{ maxWidth: 600 }}
            initialValues={{ remember: true, gender: 1, workState: WORK_STATES[0] }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="姓名"
                name="username"
                rules={[{ required: true, message: '请填写您的姓名' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="性别"
                name="gender"
                rules={[{ required: true, message: '请选择您的性别' }]}
            >
                <Radio.Group >
                    <Radio value={Genders.MALE.value}> {Genders.MALE.label} </Radio>
                    <Radio value={Genders.FEMALE.value}> {Genders.FEMALE.label} </Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="手机号"
                name="phone"
                rules={[{ required: true, message: '请填写您的手机号' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="电子邮箱"
                name="email"
                rules={[{ required: true, message: '请填写您的邮箱' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="目前学习/工作状态"
                name="workState"
                rules={[{ required: true, message: '请选择您的工作状态' }]}
            >
                <Radio.Group style={{ width: 700, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {WORK_STATES.map((state, index) => <Radio value={state} key={`work-state-${index}`}>{state}</Radio>)}
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label="所在或毕业的高校名称"
                name="school"
                rules={[{ required: true, message: '请填写您所在或毕业的高校名称' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="在校期间学习的专业"
                name="major"
                rules={[{ required: true, message: '请填写您在校期间学习的专业' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="目前所在的城市"
                name="region"
                rules={[{ required: true, message: '请选择您目前所在的城市' }]}
            >
                <Cascader defaultValue={[]} options={REGIONS} placement='bottomLeft' />
            </Form.Item>
            <Form.Item
                label="目前所在的单位"
                name="company"
                rules={[{ required: true, message: '请填写您目前所在的单位' }]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                label="感兴趣的就业地区"
                name="interestRegion"
                rules={[{ required: true, message: '请填写您感兴趣的就业地区' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="具体年级"
                name="grade"
                rules={[{ required: true, message: '请填写您的具体年级' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Github username"
                name="githubName"
                rules={[{ required: true, message: '请填写您的Github Name' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="目前擅长（感兴趣）的技术有哪些？"
                name="goodAt"
                rules={[{ required: true, message: '请至少选择一项您擅长或者感兴趣的技术' }]}
            >
                <Checkbox.Group style={{ width: 700, display: 'flex', flexDirection: 'column', gap: 10 }} options={GOOD_AT_OPTIONS.map(s => ({ label: s, value: s }))} defaultValue={['Pear']} />
            </Form.Item>
            <Form.Item
                label="通过什么渠道了解到训练营的?"
                name="channel"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="参加训练营的期望是什么?对训练营有什么建议吗?"
                name="suggestion"
            >
                <Input.TextArea />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
}
export default Register