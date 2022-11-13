import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageBooks = () => {
	const { appTitle } = useContext(AppContext);

	return (
		<>
			<p>This is the {appTitle} books page.</p>
		</>
	);
};
