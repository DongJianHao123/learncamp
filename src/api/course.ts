import { apiCamp } from "@/api/fakeData/camp/get_camps";
import { fetchClientByClientName } from "."
import { apiCourse, apiCourses } from "@/api/fakeData/course";

export const fetchStage = async (clientName: string, campId: string, stage: number) => {
    const client = await fetchClientByClientName(clientName);
    // const camp=await apiCamp(client.clientId,campId);
    const course = await apiCourse(client.clientId, campId, stage)
    return course
}