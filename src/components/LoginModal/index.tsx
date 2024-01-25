'use client'
import { Button, Input, Modal } from "antd"
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { selectLoginModalOpen, setLoginModalOpen } from "@/store/reducer/loginModalOpen"
import Image from "next/image"
import Icon from "@ant-design/icons/lib/components/Icon"
import WxIcon from "@/common/svg/wx-icon"
const LoginModal = () => {
    const loginModalOpen = useAppSelector(selectLoginModalOpen)
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setLoginModalOpen(false))
    }
    return <Modal wrapClassName={styles['login-modal']} open={loginModalOpen} width={'60%'} onCancel={handleClose} closable={false} footer={false}>
        <div className={styles['login-wrap']}>
            <div className={styles["content"]}>
                <div className={styles["login-title"]}>训练营</div>
                <div className={styles["slogans"]}>
                    <div className={styles["slogan"]}>相互学习，不断成长</div>
                    <div className={styles["slogan"]}>推动技术进步，探索无限可能</div>
                </div>
                <div className={styles["login-tip"]}>Welcome  back! Please login to your account.</div>
                <div className="login-form">
                    <Input placeholder="手机号" />
                    <Input placeholder="验证码" suffix={<Button type="link">发送验证码</Button>} />
                    <Button type='primary'>登录</Button>
                    <Icon component={WxIcon} />
                </div>
            </div>
            <Image width={1000} height={2000} className={styles['right']} src="/assets/images/login-bg.png" alt="" />
        </div>
    </Modal>
}

export default LoginModal   