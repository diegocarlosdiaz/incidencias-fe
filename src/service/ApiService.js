import axios from 'axios';

export default class ApiService {

    static async get(url, params = {}) {
        try {
            if(axios.defaults.baseURL !== window._env_.API_URL){
                axios.defaults.baseURL = window._env_.API_URL;
                console.log(window._env_.API_URL)
            }
            const response= await axios.get( url, {
                params,
            });
            const totalItems = response.headers.get('total-items')
            const data = response.data;
            return { data, totalItems };
        } catch (error) {
            throw error;
        }
    }

    static async getCsv(url, params = {}) {
        try {
            if(axios.defaults.baseURL !== window._env_.API_URL){
                axios.defaults.baseURL = window._env_.API_URL;
            }
            const response= await axios.get( url, {
                params,
                responseType: 'blob',
            });

            const data = response.data  

            const href = URL.createObjectURL(data);
            const link = document.createElement('a');

            link.href = href;

            const contentDisposition = response.headers.get('content-disposition');
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            const filename = matches != null && matches[1] ? matches[1].replace(/['"]/g, '') : 'file.csv';

            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();

            // clean up "a" element & remove ObjectURL
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
