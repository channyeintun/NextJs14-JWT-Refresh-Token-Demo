export function setAPIToken(apiInstance, token) {
    apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
}
