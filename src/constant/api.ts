import environment from '../environments';

export interface apiParams {
  [key: string]: any;
}

export const apiCallStatus = {
  STANDBY: -1,
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
};


const api = {
  getBaseUrl: (): string => environment.apiBaseUrl,
  getAccessToken: async (): Promise<string | null> => {
    try {
      return await localStorage.getItem('token');
    } catch (e) {
      console.log(e);
      return '';
    }
  },
  getHeaders: async () => {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await api.getAccessToken()}`,
    };
  },
  getUploadHeaders: async () => {
    return {
      Accept: 'application/json',
      'Content-Type': 'content-type: multipart/form-data',
      Authorization: `Bearer ${await api.getAccessToken()}`,
      redirect: 'follow',
    };
  },
  setAccessToken: async (token: string) => {
    try {
      await localStorage.setItem('token', token);
    } catch (e) {
      console.log(e);
    }
  },
  removeAccessToken: async () => {
    try {
      await localStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  },
};

export default api;
