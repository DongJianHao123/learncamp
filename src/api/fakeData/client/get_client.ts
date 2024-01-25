import delay from "@/common/utils/delay";
import { IClient } from "@/core/types/client";
export const apiClient = (clientName: string): Promise<IClient> => {
  return new Promise(async (resolve, reject) => {
    await delay(2000);
    const data:IClient = {
      id: 1,
      clientId: "600",
      clientName: clientName,
      type: 0,
      status: 0,
      name: "鸿蒙智能座舱应用开发训练营",
      homePageInfo: {
        id: 1,
        logoUrl: '/assets/images/harmony-logo.png'
      }
    }
    resolve(data)
  })
}
