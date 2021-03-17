import { h } from 'preact';
import style from './style.css';
import ButtonWithModal from './../../components/buttonWithModal';
import GameLink from './GameLink.js';

const Square = ({ square, settings: { showMistakes, filterCandidates, toggleFilterCandidates } }) => {
	let className = square.isUserProvided ? style.userSquare : style.defaultSquare;
	
	if (showMistakes && square.isIncorrect) className += " " + style.incorrectSquare;
	const candidates = filterCandidates ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : square.candidates;
	return <ButtonWithModal
		class={`${style.square} ${className}`} 
		disabled={!square.isUserProvided} 
		buttonText={String(square.displayValue)}
	>
		{candidates.map(candidate => {
			return <GameLink value={candidate} index={square.index}>{candidate}</GameLink>
		})}

		<GameLink value={'.'} index={square.index}>Remove guess</GameLink>
		<button onClick={toggleFilterCandidates}>
			{filterCandidates ? "Hide invalid candidates" : "Show all candidates"}
		</button>
	</ButtonWithModal>
}

export default Square;