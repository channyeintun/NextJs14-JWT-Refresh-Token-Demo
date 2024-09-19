import axios from "axios";

export const removeAPIToken = (apiInstance) => {
    apiInstance.defaults.headers.Authorization = "";
    axios.defaults.headers.common.Authorization = "";
};
