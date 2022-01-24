import React from 'react';
import { Row, Col } from 'antd';

const BorderWrap = (props) => {
	return (
		<aside id="info-block" style={{ width: '100%' }}>
			<section className="file-marker">
				<div>
					<div className="box-title">
						{props.propsHeader}
					</div>
					<div className="box-contents">
						<div id="audit-trail">
							<Row gutter={24} key={props.propsHeader + props.propsContent}>
								{props.propsContent}
								<Col span={24} style={{ width: '1080px' }}></Col>
							</Row>
						</div>

					</div>
				</div>
			</section>
		</aside>
	);
};

export default BorderWrap;