import { useState, useEffect } from 'preact/hooks';

const useSettings = () => {
	const [showMistakes, setShowMistakes] = useState(false);
	const [filterCandidates, setSetFilterCandidates] = useState(true);
	const toggleShowMistakes = (e) => setShowMistakes(!showMistakes);
	const toggleFilterCandidates = (e) => setSetFilterCandidates(!filterCandidates);
	return {
		filterCandidates,
		toggleFilterCandidates,
		toggleShowMistakes,
		showMistakes,
	}
}

export default useSettings;