import { Districts } from "../types/FinPoint";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:3001/api',
});


export default async function getDistrics(): Promise<Districts> {
    return axiosInstance.get(`/getDistricts`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            return null;
        });
}
