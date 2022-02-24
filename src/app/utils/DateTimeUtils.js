const dayjs = require('dayjs');

const getCurrentDateTime = () => {
	return dayjs().toDate();
};

export default {
	getCurrentDateTime,
};
