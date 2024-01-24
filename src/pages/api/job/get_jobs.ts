import delay from "@/common/utils/delay"
import { IJob } from "@/types/job"

const jobs = (): IJob[] => ([
    {
        id: 1,
        partnerId: 1,
        name: '鸿蒙js开发',
        description: '',
        salary: { max: 14, min: 12 },
        city: '北京',
        province: '海淀',
        contact: '18600000000',
        requirement: '本科及以上学历，经验不限',
        partner: {
            id: 1,
            name: '上海华为技术'
        }
    },

    {
        id: 2,
        partnerId: 2,
        name: '鸿蒙内核资深开发工程师',
        description: '',
        salary: { max: 65, min: 35, times: 13 },
        city: '北京',
        province: '海淀',
        contact: '18600000000',
        requirement: '本科及以上学历，经验不限',
        partner: {
            id: 2,
            name: '普华基础软件'
        }
    },

    {
        id: 3,
        partnerId: 3,
        name: '软件开发工程师 安卓 鸿蒙',
        description: '',
        salary: { max: 20, min: 11 },
        city: '北京',
        province: '海淀',
        contact: '18600000000',
        requirement: '本科及以上学历，经验不限',
        partner: {
            id: 3,
            name: '欧瑞科斯科技'
        }
    },
])
export const apiJobs = async (): Promise<IJob[]> => {

    return new Promise(async (resolve, reject) => {
        await delay(2000);
        resolve(jobs())
    })
}
