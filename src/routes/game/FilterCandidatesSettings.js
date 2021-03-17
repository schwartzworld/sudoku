import { h } from 'preact';

const FilterCandidatesSettings = ({ show = false, onChange }) => {
	return <label for="filterCandidates">
		Only show valid candidates
		{show ? <button id="filterCandidates" onClick={onChange}>Hide invalid candidates</button> :
				<button id="filterCandidates" onClick={onChange}>Show all candidates</button>}
	</label>
}


export default FilterCandidatesSettings;
