'use client'
import Header from "./header"
import Content from "./content"
import Footer from "./footer"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchClientByClientName, getHomePage } from "@/api"
import { setCurrClient } from "@/store/reducer/currClient"

interface IProps {
    children: ReactNode
}

const MainLayout = (props: any) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const clientName = location.pathname.split('/')[1]
        fetchClientByClientName(clientName).then(res => {
            getHomePage(res.clientId).then((homePage) => {
                dispatch(setCurrClient({ ...res, homePageInfo: homePage }))
                console.log({ ...res, homePageInfo: homePage });
            })
        })
    }, [])
    return <div className="layout">
        <Header />
        <Content>
            {props.children}
        </Content>
        <Footer />
    </div>
}

export default MainLayout