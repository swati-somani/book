import { request } from "./request";
 const ENDPOINT = "api/user";

 const login = async (data) =>{
    const url = `${ENDPOINT}/login`;
    return request.post(url,data).then((res) =>{
        return res;
    });
 }

 const register = async (data) =>{
    const url = `${ENDPOINT}`;
    return request.post(url,data).then((res) =>{
        return res;
    });
 }

export const authService = {
    login,
    register
 };
