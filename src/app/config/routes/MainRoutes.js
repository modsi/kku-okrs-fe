import React, { PureComponent } from 'react';
import { Switch } from 'react-router';
import PropTypes from 'prop-types';

class MainRoutesConfig extends PureComponent {
	render() {
		return <Switch></Switch>;
	}
}
MainRoutesConfig.propTypes = {
	match: PropTypes.object,
};
MainRoutesConfig.defaultProps = {
	match: null,
};

export default MainRoutesConfig;
