import { h } from 'preact';
import style from './style.css';

const ShowMistakesSettings = ({ show = false, onChange }) => {
	return <div class={style.settingsContainer}>
		<label for="showMistakes">
			Show Mistakes
		</label>
		{show ? <button id="showMistakes" onClick={onChange}>Hide</button> :
			<button id="showMistakes" onClick={onChange}>Show</button>}
		</div>
}

export default ShowMistakesSettings;
