import { h } from 'preact';

const ShowMistakesSettings = ({ show = false, onChange }) => {
	return <label for="showMistakes">
		Show Mistakes
		{show ? <button id="showMistakes" onClick={onChange}>Hide mistakes</button> :
				<button id="showMistakes" onClick={onChange}>show mistakes</button>}
	</label>
}

export default ShowMistakesSettings;
