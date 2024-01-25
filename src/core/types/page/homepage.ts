export interface IBanner {
    id: number;
    type: 'img' | 'text';
    title: string;
    desc: string;
    image: string;
    link: string;
}

export interface ICommunityData {
    students: number;
    partners: number;
    authentication: number;
}

export interface IJob {
    id: number;
    title: string;
    partnerId: number;
    partner: {
        id: number,
        name: string
    };
    requirement: string;
    salary: string;
}

export interface ITask {
    id: number;
    title: string;
    getNumber: number;
    claimed: boolean;
}
export interface IBbs {
    id: number;
    title: string;
    logo: string;
    answerNum: number;
}
export interface INewType {
    id: number;
    title: string;
    weight: number;
}
export interface INew {
    id: number;
    title: string;
    intro: string;
    cover: string;
    content: string;
    authorId: number;
    author: {
        id: number;
        name: string;
        avatar: string;
    };
    createdAt: number;
    viewNum: number;
    likeNum: number;
    collectNum: number;
}
export interface IAd {
    title: string;
    desc: string;
    qrcodeTitle: string;
    qrcodeTitleLink: string;
    qrcodeURL: string[];
    mainScreenBgUrl: string;
    mainScreenQrUrl: string;
    extra: string[];
}

export interface HomeData {
    banners: IBanner[]
    communityData: ICommunityData
    jobs: IJob[]
    tasks: ITask[]
    bbs: IBbs[]
    newTypes: INewType[]
    news: INew[]
    ads: IAd[]
}