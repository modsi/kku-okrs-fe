import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonTH from '@Locale/en_US/common.json';
import transTH from '@Locale/en_US/trans.json';

i18n.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources: {
			th: {
				common: commonTH,
				trans: transTH,
			},
		},
		lng: 'th',
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	});

export default i18n;
