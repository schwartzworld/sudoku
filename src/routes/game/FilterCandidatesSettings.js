import { h } from 'preact';
import style from './style.css';

const FilterCandidatesSettings = ({ show = false, onChange }) => {
	return <div class={style.settingsContainer}>
		<label for="filterCandidates">
			Only show valid candidates
		</label>
			{show ? <button id="filterCandidates" onClick={onChange}>Filter</button> :
					<button id="filterCandidates" onClick={onChange}>Reveal</button>}
	</div>
}


export default FilterCandidatesSettings;
