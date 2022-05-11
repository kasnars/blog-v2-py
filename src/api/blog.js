import { httpGet, httpPost } from "../network"

export const getAllBlogListHttp = () => {
    return httpGet('/Blog/get_blog_list/')
}

export const getBlogByIdHttp = (data) => {
    return httpGet('/Blog/blog_detail/',data)
}

export const blogSearchHttp = (data) => {
    return httpGet('/Blog/blog_search/', data,true)
}
export const createBlogHttp = (data) => {
    return httpPost('/Blog/create_blog/',data)
}
// export const searchBlogHttp = (data) => {
//     return httpPost('/Blog/blog_search/', {},data)
// }


export const updateBlogHttp = (data) => {
    return httpPost('/Blog/blog_update/', data)
}

export const removeBlogHttp = (data) => {
    return httpGet('/Blog/blog_update/', data)
}

export const addComHttp = (data) => {
    return httpPost('/Comment/comment_create/',data)
}

export const getComHttp = (data) => {
    return httpGet('/Comment/blog_commentlist_get/',data)
}

export const postSubComHttp = (data) => {
    return httpPost('/Comment/sub_comment_create/',data)
}
export const delComHttp = (data) => {
    return httpGet('/Comment/commentlist_remove/', data)
}

export const getBoardHttp = (data) => {
    return httpGet('/Board/board_get/', data, true)
}

export const createBoardHttp = (data) => {
    return httpPost('/Board/board_create/',data)
}

export const getLikeListHttp = (data) => {
    return httpGet('/Blog/like_blog_create/',data)
}

export const delLikeHttp = (data) => {
    return httpGet('/Blog/like_blog_delete/',data)
}

export const addLikeHttp = (data) => {
    return httpPost('/Blog/like_blog_create/',data)
}

export const getTagBlogs = (data) => {
    return httpGet('/Blog/get_tag_blog/',data)
}

export const likeHttp = (data) => {
    return httpPost('/Blog/good_blog_create/',data)
}

export const deikeHttp = (data) => {
    return httpPost('/Blog/good_blog_delete/',data)
}