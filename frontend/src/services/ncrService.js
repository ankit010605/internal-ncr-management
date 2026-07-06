import api from "../api/api";

export const createNCR = async (formData) => {
    const response = await api.post("/ncr", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};

export const getMasterData = async () => {
    const response = await api.get("/master");
    return response.data;
};

export const getAllNCRs = async () => {
    const response = await api.get("/ncr");
    return response.data;
};