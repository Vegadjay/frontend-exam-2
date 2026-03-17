import { baseUrl } from "@/lib/url";

export const getDoctors = async (token: string) => {
    const response = await fetch(`${baseUrl}/doctor/queue`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET"
    });
    const data = await response.json();
    return data;
}