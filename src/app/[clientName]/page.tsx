import { apiCamps } from '@/pages/api/camp/get_camps';
import { fetchClientByClientName } from '@/api';
import ClientHomePage from '@/components/Client';
import { apiJobs } from '@/pages/api/job/get_jobs';
interface IProps {
    params: { clientName: string }
}

async function getData(name: string) {
    const client = await fetchClientByClientName(name);
    const camps = await apiCamps(client.clientId)
    const jobs = await apiJobs();
    return {
        client: { ...client, camps, jobs }
    }
}

const Client = async (props: IProps) => {
    const {  client } = await getData(props.params.clientName)
    return <ClientHomePage client={client} />
}

export default Client