import { httpGet, httpPost } from "../network"

export const getUserListHttp = () => {
    return httpGet('/Auth/get_user_list/')
}

export const loginHttp = (data) => {
    return httpPost('/Auth/login/',data)
}

export const regHttp = (data) => {
    return httpPost('/Auth/register/',data)
}