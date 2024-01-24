import MainLayout from "@/layout"
import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

export default function Layout(props: IProps) {
    return <MainLayout>
        {props.children}
    </MainLayout>
}