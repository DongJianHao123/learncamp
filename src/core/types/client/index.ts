import { IJob } from "../job";

export interface IClient {
    id: number;
    clientId: string;
    clientName: string;
    type: number;
    status: number;
    name: string;
    telephone?: string;
    email?: string;
    createdAt?: string | number;
    updatedAt?: string | number;
    homePageInfo?: IHomepageInfo
    camps?: ICamp[],
    jobs?: IJob[]
}

export interface IHomepageInfo {
    id: number;
    aboutUsImgUrl?: string;
    aboutUsInfo?: string;
    clientId?: string;
    companyEmail?: string;
    companyName?: string;
    companyPhone?: string;
    companyQrUrl?: string;
    consultUrl?: string;
    coverUrl?: string;
    createdAt?: string | number;
    icpInfo?: string;
    logoUrl?: string;
    status?: number;
    title?: string;
    updatedAt?: string | number;
}