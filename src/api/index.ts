import request from "@/service";
import { IClient } from "@/types/client";

// let CLIENT_ID = 41; //479 鸿蒙 450 rustedu //481 riscv 476 cicv //483 vue
const PAGE_SIZE = 2000;

export async function getHomePage(CLIENT_ID: string) {
  const res = await request<never, any[]>("/seller/api/homepages", {
    params: {
      "clientId.equals": CLIENT_ID,
    },
  });
  return res[0];
}

export async function getCourses(popular: boolean, CLIENT_ID: string) {
  const url = popular
    ? `/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=18&clientId=${CLIENT_ID}&tag=hot&isDelete=1&sort=courseIndex,asc`
    : `/seller/api/coursesget/getAllCoursesByConditionsWithTotal?page=0&size=100&isDelete=1&clientId=${CLIENT_ID}&sort=courseIndex,asc`;

  return await request<never, { courseList: ICourse[] }>(url);
}

export async function getMyCourses(phone: any, page = 0, CLIENT_ID: number) {
  return await request<never, { courseList: any[]; totalNum: number }>(
    `/seller/api/students/getAllCourseByStudentWithTotal?clientId=${CLIENT_ID}`,
    {
      params: {
        page,
        phone,
        size: 20,
        sort: "id,desc",
      },
    }
  );
}

export async function getCourse(id: string, CLIENT_ID: string) {
  console.log(id,CLIENT_ID);
  
  const res = await request<never, any[]>("/seller/api/courses", {
    params: {
      "clientId.equals": CLIENT_ID,
      "courseId.equals": id,
    },
  });
  
  return res[0];
}

export async function getTeachars(CLIENT_ID: number) {
  return await request<never, { teacherList: any[] }>(
    `/seller/api/teachers/getAllTeachersByConditionsWithTotal?page=0&size=10&clientId=${CLIENT_ID}`
  );
}

export async function getStudentOfCourse(courseId: any, CLIENT_ID: number) {
  const res = await request<never, any[]>("/seller/api/students", {
    params: {
      "clientId.equals": CLIENT_ID,
      "courseId.equals": courseId,
      size: PAGE_SIZE,
    },
  });
  return res;
}

export async function getReplayOfCourse(courseId: any, CLIENT_ID: number) {
  const res = await request<never, any[]>("/seller/api/course-classes", {
    params: {
      "clientId.equals": CLIENT_ID,
      "courseId.equals": courseId,
      size: PAGE_SIZE,
      sort: "startAt,desc",
      // status: 1 //后端缺少验证该字段，拉取了未上架的视频
    },
  });
  return res;
}

// export async function registerCourse(data: any) {
//   const res = await request<never, IMyRegister>("/seller/api/students", {
//     method: "POST",
//     data,
//   });
//   return res;
// }

// export async function getMyRegisters(phone: string, CLIENT_ID: number) {
//   const res = await request<never, IMyRegister[]>("/seller/api/students", {
//     params: {
//       "clientId.equals": CLIENT_ID,
//       "phone.equals": phone,
//     },
//   });
//   return res;
// }

export async function getReplayerChatHistory(params: {
  roomId: string;
  startTime: string;
  endTime: string;
  clientId: number;
}) {
  const { roomId, startTime, endTime, clientId } = params;
  const res = await request<never, { totalNum: number; roomActionList: any[] }>(
    "/analysis/api/room-actions/getRoomActionsWithTotalNumByConditionsTime",
    {
      params: {
        roomId,
        startTime: new Date(startTime).toJSON(),
        endTime: new Date(endTime).toJSON(),
        clientId: clientId,
        page: 0,
        size: 200,
        actionType: "CHAT",
      },
    }
  );
  return res;
}
export async function fetchClient(CLIENT_ID: number) {
  const res = await request<never, Array<IClient>>(
    `seller/api/clients?current=1&pageSize=10&clientId.equals=${CLIENT_ID}&size=10`
  );
  return res[0];
}
export async function fetchClientByClientName(name: string) {
  const res = await request<never, Array<IClient>>(
    `seller/api/clients?current=1&pageSize=10&clientName.equals=${name}&size=10`
  );
  return res[0];
}
//机构
export async function clients(params: any) {
  const res = await request<never, Array<IClient>>(`/seller/api/clients`, {
    params: params,
  });
  return res[0];
}

//机构购买时长
export async function fetchOrderAgenciesByConditions(CLIENT_ID: number): Promise<any[]> {
  return request(
    `/order/api/order-agencies/getOrderAgenciesByConditions?clientId=${CLIENT_ID}&size=200&sort=id,desc`,
  );

}
//机构使用时长
export async function fetchTotalSummaryCount(CLIENT_ID: number): Promise<any> {
  return request(
    `/analysis/api/day-summaries/getTotalSummaryCount?clientId=${CLIENT_ID}`,
  );
}
export async function sendCaptcha(params: any) {
  const res = await request(`/base/api/common/sms/sendCaptcha`, {
    params: params,
  });
  return res;
}
export async function verifyCaptcha(params: any) {
  const res = await request(`/base/api/common/sms/verifyCaptcha`, {
    params: params,
  });
  return res;
}
// export async function studentAction(data: RoomActionType) {
//   const res = await request("/analysis/api/room-actions", {
//     method: "POST",
//     data,
//   });
// }

export async function sendEmail(data: any) {
  const res = await request("/base/api/email/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    data,
  });
}

export const getDomainNameConfiguration = async () => {
  const res = await fetch("https://rustedu.com/r2edu-api/mapping.json");
  const list = (await res.json()).list;
  return list;
};

// export const testGiteeApi = async () => {
//   const res = await request("https://gitee.com/dong-jianhao/r2edu-api/raw/master/domain_name_mapping.json", {
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': "get post,put,delete"
//     }
//   })
//   console.log(res);
// }
export const sendUrlToBing = async () => {
  const res = await request({
    url: "https://www.bing.com/indexnow",
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      host: "cicvedu.com",
      key: "f2f6381b2e4b4105bf286473c295c35d",
      keyLocation: "https://cicvedu.com/f2f6381b2e4b4105bf286473c295c35d.txt",
      urlList: [
        "https://cicvedu.com/course/101",
        "https://cicvedu.com/course/102",
        "https://cicvedu.com/course/103",
      ],
    },
  });
};

export async function getVideosFromBilibili() {
  const res = await request(
    `https://api.bilibili.com/x/space/wbi/arc/search?mid=3493135044840333&pn=1&ps=25&order=click&index=1&platform=web&web_location=1550101&w_rid=4f81aae255d2d9313680f69a4ae1bbce&wts=1685529337`
  );
  return res.data;
}

export async function getCollectionsFromBilibili() {
  const res = await request(
    `https://api.bilibili.com/x/polymer/web-space/home/seasons_series?mid=3493135044840333&page_num=1&page_size=10`
  );
  return res.data;
}
