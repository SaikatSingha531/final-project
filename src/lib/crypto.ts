export const encrypt = (text: string) => btoa(text);
export const decrypt = (text: string) => atob(text);