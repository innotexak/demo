import { ADMIN_ROOT_API } from '../helpers/axiosBase';

export default class API_Query {
	async getAdminProfile() {
		return await ADMIN_ROOT_API.get('/admin/api/v1/users/profile')
		 .then((res) => {
			 if (res.data.type === 'error') {
				 return Promise.reject({ response: { data: res.data } });
			 }
			 return res.data;
		 })
		 .catch((e) => {
			 return Promise.reject(e.response.data);
		 });
	}
	
}
