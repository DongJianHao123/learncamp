import delay from "@/common/utils/delay";
import { NextApiRequest, NextApiResponse } from "next";
import { apiCourses, apiProjects } from "../course";
import { getCourses } from "@/api";

export default async function get_camps(req: NextApiRequest, res: NextApiResponse) {
  await delay(3000)
  const camp: ICamp[] = [{
    id: 1,
    name: '202401',
    title: "rust算法训练营",
    courseIds: ['101', '102', '103'],
    projectIds: ['104'],
    clientId: '600'
  }]
  res.status(200).json(camp);
}
const data: ICamp = {
  id: 1,
  name: '202401',
  logo:"/assets/images/title-wrap.png",
  title: "2024年 第一期鸿蒙智能座舱应用开发训练营",
  description:'为职业发展打下坚实基础，不断成长为鸿蒙智能座舱应用开发的优秀人才！',
  courseIds: ['101', '102', '103'],
  projectIds: ['104'],
  clientId: '',
  courses: [],
  projects: []
}
export const apiCamps = (clientId: string): Promise<ICamp[]> => {
  return new Promise(async (resolve, reject) => {
    let [{ courseList }] = await Promise.all([getCourses(false, clientId)])
    courseList.sort((a, b) => parseInt(a.courseId) - parseInt(b.courseId))
    resolve([data].map((item) => ({ ...item, clientId, courses: courseList })))
  })
}

export const apiCamp = (clientId: string, campName: string): Promise<ICamp> => {
  return new Promise(async (resolve, reject) => {
    const [courses, projects] = await Promise.all([apiCourses(clientId, '202401'), apiProjects(clientId, '202401')])
    await delay(1000);
    resolve({ ...data, name: campName, clientId, courses, projects })
  })
}


