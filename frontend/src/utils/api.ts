import { BACKEND_URL } from "./routes";

export const getImages = async () => {
    try {
        const response = await fetch(`${BACKEND_URL}/users/coins/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    } catch (e) {
        console.error(e);
    }
};