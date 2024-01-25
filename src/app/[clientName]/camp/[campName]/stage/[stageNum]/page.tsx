import { fetchClientByClientName } from "@/api";
import { apiCourse } from "@/api/fakeData/course";
import Course from "@/components/Course";
interface IParam {
    clientName: string
    campName: string
    stageNum: number
}
interface IProps {
    params: IParam
}

const getData = async (param: IParam) => {
    console.log('==>', param);

    const { clientName, campName, stageNum } = param
    const client = await fetchClientByClientName(clientName);
    // const camp=await apiCamp(client.clientId,campId);
    const course = await apiCourse(client.clientId, campName, stageNum)
    return {
        client,
        course
    }

}
const Stage = async (props: IProps) => {
    const { course } = await getData(props.params)
    return <Course course={course}/>
}

export default Stage