'use client'
import Header from "./header"
import Content from "./content"
import Footer from "./footer"
import { ReactNode, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchClientByClientName, getHomePage } from "@/api"
import { setCurrClient } from "@/store/reducer/currClient"
import { apiCamps } from "@/api/fakeData/camp/get_camps"

interface IProps {
    children: ReactNode
}

const MainLayout = (props: any) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const clientName = location.pathname.split('/')[1]
        fetchClientByClientName(clientName).then(res => {
            getHomePage(res.clientId).then((homePage) => {
                apiCamps(res.clientId).then((camps) => {
                    dispatch(setCurrClient({ ...res, homePageInfo: homePage ,camps}))
                })
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