const useGameString = () => {
	const { pathname } = window.location;
	return pathname.split('/').filter(Boolean)[1];
};

export default useGameString();