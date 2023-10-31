import { Districts } from "../types/FinPoint";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
});

export default async function getDistrics(): Promise<Districts> {
    return axiosInstance.get(`/api/getDistricts`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            return null;
        });
}
