import axios from "axios";
import { FeatureCollection } from "../types/FinPoint";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001',
});

export default async function getPoints(id: number): Promise<FeatureCollection | null> {
    return axiosInstance.get(`/api/getRegion/${id}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Ошибка при загрузке данных:', error);
            return null;
        });
}
