import { postHttpTool } from "../tools/myHttps";

export const testApiHttp = (body) => {
  postHttpTool('/testUrl',{})
}
