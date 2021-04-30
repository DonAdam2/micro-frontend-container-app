import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
//selectors
import { getTestAction } from '../store/app/selectors/AppSelectors';
//actions
import { setTestAction } from '../store/app/actions/AppActions';

const TestComponent = () => {
	const dispatch = useDispatch(),
		testAction = useSelector((state) => getTestAction({ state }));

	return (
		<div style={{ padding: '4rem 0' }}>
			<div
				className="container"
				style={{
					textAlign: 'center',
					border: '4px dashed green',
					paddingBottom: '1rem',
				}}
			>
				<h3>container app</h3>
				<p>
					Current container environment API is <strong>{process.env.API_URL}</strong>
				</p>
				<p>
					Testing the container store <strong>{testAction}</strong>
				</p>
				<button className="std-btn primary" onClick={() => dispatch(setTestAction())}>
					Change container text hi
				</button>
			</div>
		</div>
	);
};

export default TestComponent;
