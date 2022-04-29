import { httpGet, httpPost } from '../network/index'

export const getUserTagsHttp = () => {
    return httpGet('/Tag/tag_list_get/')
}

export const getBlogtagsHttp = (data) => {
    return httpGet('/Tag/tag_relation_blog/',data)
}

export const createTagRelationHttp = (data) => {
    return httpPost('/Tag/tag_relation_create/',data)
}

export const createTagHttp = (data) => {
    return httpPost('/Tag/tag_create/', data)
}