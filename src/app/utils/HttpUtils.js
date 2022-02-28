import axios from 'axios';
import { setStorage, getStorage } from "../screens/state/localStorage";
import { ErrorModalMassage } from "../screens/items/Modal";
export const httpUtils = {
	post,
	get,
	postFormData,
	postUpload,
	patch
};

function getHeaders(headersOption) {
	let options = {
		'headers': {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"authorization": `Bearer ${getStorage("token") === undefined ? null : getStorage("token")}`,
			"fbclid": `${getStorage("token") === undefined ? null : getStorage("token")}`,
			"Access-Control-Allow-Origin": "*",
			...headersOption
		}
	}
	return options;
};

axios.defaults.timeout = 50000;
axios.interceptors.response.use(function (response) {
	// console.log("interceptors", response);
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response;
}, function (error) {
	if (error.response && error.response.status === 401) {
		//   redirect("login")
		return Promise.reject(error);
	}
	if (error.response && error.response.status === 402) {
		//   redirect("login")
		console.log(error.response.data);
		ErrorModalMassage(error.response.data);
		return Promise.reject(error);
	}
	return Promise.reject(error);
});

function patch(url, payload = {}, headersOption, responseType = 'application/json') {
	try {
		const call = async () => {
			const headers = getHeaders(headersOption);
			const options = {
				method: 'PATCH',
				url,
				...headers,
				data: JSON.stringify(payload),
				responseType: responseType,
			};
			const response = await axios(options)
				.then(response => {
					return response;
				});
			return response
		}
		return call();
	} catch (err) {
		console.error(err);
		throw err;
	}
};

function post(url, payload = {}, headersOption, responseType = 'application/json') {
	try {
		const call = async () => {
			const headers = getHeaders(headersOption);
			const options = {
				method: 'POST',
				url,
				...headers,
				data: JSON.stringify(payload),
				responseType: responseType,
			};
			//console.log("options", options);
			const response = await axios(options)
				.then(response => {
					return response;
				});
			return response
		}
		return call();
	} catch (err) {
		console.error(err);
		throw err;
	}
};

function get(url, payload = {}, headersOption) {
	try {
		const call = async () => {
			const headers = getHeaders(headersOption);
			const options = {
				method: 'GET',
				...headers,
				params: payload,
				mode: 'no-cors',
				url,
			};

			// console.log("options",options);

			const response = await axios(options)
				.then(response => {
					return response;
				});
			return response
		}
		return call();
	} catch (err) {
		console.error(err);
		throw err;
	}
};

function postUpload(url, payload = {}, headersOption) {
	try {
		const call = () => {
			const headers = getHeaders(headersOption);
			const options = {
				method: 'POST',
				url,
				...headers,
				data: payload,

			};
			//console.log("options", options);
			const response =  axios(options)
				.then(response => {
					return response;
				});
			return response
		}
		return call();
	} catch (err) {
		console.error(err);
		throw err;
	}
};

function postFormData(url, payload = {}) {

	let formData = new FormData();
	if (payload) {
		for (const [key, value] of Object.entries(payload)) {
			if (Array.isArray(value)) {
				value.forEach((val, index) => {
					console.log('form uploadFile= ', val.uploadFile)
					console.log('form modelId= ', val.modelId ?? 0)
					formData.append(`${key}[${index}].modelId`, val.modelId ?? 0)
					formData.append(`${key}[${index}].flag`, val.flag)
					formData.append(`${key}[${index}].uploadFile`, val.uploadFile)
				});
			} else {
				formData.append(key, value)
			}

		}
	}



	try {

		const call = async () => {
			const headers = getHeaders({ "Accept": "*/*", "Content-Type": "multipart/form-data" });
			const options = {
				method: 'POST',
				url,
				...headers,
				data: formData,
				//responseType:'application/json'

			};
			console.log("options", options);
			const response = await axios(options)
				.then(response => {
					return response;
				});
			return response
		}
		return call();
	} catch (err) {
		console.error(err);
		throw err;
	}
};
