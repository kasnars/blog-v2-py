export const getUserInfo  = () => {
    let token = localStorage.getItem('tokenYzx')
    let strings = token.split("."); //截取token，获取载体
    var userinfo = JSON.parse(decodeURIComponent(escape(window.atob(strings[1].replace(/-/g, "+").replace(/_/g, "/"))))); 
    console.log(userinfo,'gettoken');
    return userinfo
}