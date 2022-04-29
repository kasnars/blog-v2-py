import axios from "axios";
import { defaultBaseUrl } from "../../blogSet.config";

export const postHttpTool = (url, body={}) => {
  posturl = `${defaultBaseUrl}${url}`
  axios.post(posturl,body).then(res => {
    return res.data.data
  }).catch(err => {
    this.$message.error(err.data.msg)
  })
}