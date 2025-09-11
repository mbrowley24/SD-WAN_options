'use client';

import {useState} from "react";

export const useHttp = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);
    const base_url = "https://clownfish-app-3ncmz.ondigitalocean.app/"
    // const base_url = "http://localhost:8000/${url}"
    const request = async (
        url,
        applyData,
        options )=> {

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`${base_url}${url}`, {
                ...options,
                headers: {
                    'Content-Type': 'application/json',
                    ...(options?.headers || {}),
                },
                credentials: 'include', // include cookies (e.g., JWT)
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
