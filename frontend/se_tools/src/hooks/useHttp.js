'use client';

import {useState} from "react";

export const useHttp = () => {
    const [data, setData] = useState({});
    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const request = async (
        url,
        applyData,
        options )=> {

        setLoading(true);
        setError(null);

        try {
            const res = await fetch(`http://localhost:8000/${url}`, {
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
