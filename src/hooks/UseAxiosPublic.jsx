import axios from "axios";

export const axiosPublic=axios.create({
    baseURL:'https://setu-backend-1slc.onrender.com'
})
const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;