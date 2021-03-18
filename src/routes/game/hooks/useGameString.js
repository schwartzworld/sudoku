const useGameString = () => {
	const { search } = window.location;
	return new URLSearchParams(search).get('g');
};

export default useGameString;