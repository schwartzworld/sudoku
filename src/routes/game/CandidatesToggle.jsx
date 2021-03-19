import { h } from 'preact';
import style from './style.css';

const CandidatesToggle = ({ show = false, onChange }) => {
	return <div class={style.settingsContainer}>
		<label for="filterCandidates">
			Mark Square or Candidates
		</label>
			{show ? <button id="markSquare" onClick={onChange}>Answers Mode</button> :
					<button id="markSquare" onClick={onChange}>Candidate Mode</button>}
	</div>
}


export default CandidatesToggle;
