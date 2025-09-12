'use client';

import {useState} from "react";

export const useHttp = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const baseUrl = "https://whale-app-dwbzw.ondigitalocean.app/api"
    //const baseUrl = process.env.BACKEND_URL || 'http://localhost:8000';
    //const base_url = "http://localhost:8000/"
    
    const request = async (
        url,
        applyData,
        options )=> {

        setLoading(true);
        setError(null);
        console.log(baseUrl)
        try {
            const res = await fetch(`${baseUrl}/${url}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(options?.headers || {}),
                },
                // credentials: 'include', // include cookies (e.g., JWT)
            });

            applyData(res)

        } catch (err) {

            setError(err.message || 'Something went wrong');

            return null;

        } finally {

            setLoading(false);
        }

    }

    return {request, data, error, loading}
};

export default useHttp;
