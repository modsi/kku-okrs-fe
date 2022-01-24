import { v4 as uuid } from 'uuid';

export const storageConfig = {
	accesstoken: 'accessToken',
};

export const reduxPersistConfig = {
	persistKey: 'root',
	encryptKey: uuid(),
};
export const contextRoot = process.env.CONTEXT_ROOT;
export const contextPath = '/management';
export const webContextPath = contextRoot + contextPath;

export const apiEndpoint = process.env.API_ENDPOINT;

export const apiInquiry = process.env.API_SETTLEMENT_ENDPOINT;

export const appVersion = process.env.APP_VERSION;
