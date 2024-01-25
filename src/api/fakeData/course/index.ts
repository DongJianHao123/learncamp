import { getCourse } from "@/api"
import delay from "@/common/utils/delay"
import { apiCamp } from "../camp/get_camps"

export const apiProjects = (clientId: string, campName: string): Promise<ICourse[]> => {
    const data = [
        {
            clientId: clientId,
            campName: campName,
            courseId: "104",
            coverUrl: "/assets/images/title-wrap.png",
            id: 1,
            stage: 3,
            title: "rust算法实践",
            beginAt: new Date(),
            endAt: new Date(new Date().getTime() + 360000),
            standingsUrl: "/stangdings/101",
            textbooks: ['']
        }
    ]
    return new Promise(async (resolve) => {
        await delay(2000)
        resolve(data)
    })

}

export const apiCourses = (clientId: string, campName: string): Promise<ICourse[]> => {
    const data = [
        {
            clientId: clientId,
            campName: campName,
            courseId: "101",
            coverUrl: "/assets/images/title-wrap.png",
            id: 1,
            stage: 0,
            title: "预学习阶段",
            beginAt: new Date(),
            endAt: new Date(new Date().getTime() + 360000),
            standingsUrl: "/stangdings/101",
            textbooks: ['']
        },
        {
            clientId: clientId,
            campName: campName,
            courseId: "102",
            coverUrl: "/assets/images/title-wrap.png",
            id: 2,
            stage: 1,
            title: "rust算法基础",
            beginAt: new Date(),
            endAt: new Date(new Date().getTime() + 360000),
            standingsUrl: "/stangdings/101",
            textbooks: ['']
        },
        {
            clientId: clientId,
            campName: campName,
            courseId: "103",
            coverUrl: "/assets/images/title-wrap.png",
            stage: 2,
            id: 1,
            title: "rust算法进阶",
            beginAt: new Date(),
            endAt: new Date(new Date().getTime() + 360000),
            standingsUrl: "/stangdings/101",
            textbooks: ['']
        },
    ]
    return new Promise(async (resolve) => {
        await delay(2000)
        resolve(data)
    })
}
export const apiCourse = async (clientId: string, campName: string, stage: number): Promise<ICourse> => {
    const camp = await apiCamp(clientId, campName)
    const { courseIds, projectIds } = camp

    let courseId = stage < courseIds.length ? courseIds[stage] : projectIds[stage - courseIds.length]

    const data = await getCourse(courseId, clientId)
    return data
}
