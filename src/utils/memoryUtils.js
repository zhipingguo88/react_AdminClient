/* 

*/

import storageUtils from "./storageUtils"

export default{
    user:storageUtils.getUser(),//用来储存用户信息，初始值为local中读取的user
}