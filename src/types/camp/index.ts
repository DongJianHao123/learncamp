interface ICamp {
    id: number,
    name: string,
    title: string,
    clientId: string,
    courseIds: string[] //课程学习，必修
    projectIds: string[]//项目实习，选修
    description?: string
    logo?: string
    content?: string
    courses?: ICourse[]
    projects?: ICourse[]
}

interface ICourse {
    applyCount?: number
    buyersCount?: number
    clientId: string
    clientName?: string
    courseClasss?: any[]
    courseId: string
    courseIndex?: number
    coverUrl: string
    createdAt?: Date
    domain?: string
    gradeLevel?: number
    id: number
    index?: number
    info?: string
    introduction?: string
    isDelete?: number
    isSpecail?: number
    ishd?: number
    linkUrl?: string
    location?: string
    oldPrice?: number
    price?: number
    roomId?: number
    showqr?: number
    startAt?: Date
    status?: number
    summary?: string
    tag?: string
    teacher?: string
    title: string
    totalNum?: number
    type?: number
    typeId?: string
    updatedAt?: Date
    //new 
    campName:string
    stage?: number
    beginAt: Date
    endAt: Date
    standingsUrl: string
    textbooks: string[]
}