import { useState, useEffect } from 'preact/hooks';

const useSettings = () => {
	const [showMistakes, setShowMistakes] = useState(false);
	const [filterCandidates, setFilterCandidates] = useState(true);
	const [candidateMode, setCandidateMode] = useState(false);
	const toggleShowMistakes = (e) => setShowMistakes(!showMistakes);
	const toggleFilterCandidates = (e) => setFilterCandidates(!filterCandidates);
	const toggleCandidateMode = (e) => setCandidateMode(!candidateMode);
	return {
		filterCandidates,
		toggleFilterCandidates,
		toggleShowMistakes,
		showMistakes,
		candidateMode,
		toggleCandidateMode
	}
}

export default useSettings;