import { h } from 'preact';
import style from './style.css';
import ButtonWithModal from './../../components/buttonWithModal';
import GameLink from './GameLink.js';
import CandidateLink from './CandidateLink.jsx';
import useCandidateHref from './hooks/useCandidateHref.js'

const SquareClickButton = ({ children, id }) => {
	const { binary } = useCandidateHref(id, 1);
	if (children) return <span>
		{children}
	</span>;
	const className = `${style.square} ${style.candidateSquareWrapper}`
	const candidates = binary.split('')
		.map((c, index) => {
			if (c === '0') return ' ';
			return String(Number(index + 1));
		});
	return <span class={className}>
		<div class={style.candidateInner}>
			<div>{candidates[0]}</div>
			<div>{candidates[1]}</div>
			<div>{candidates[2]}</div>
		</div>
		<div class={style.candidateInner}>
			<div>{candidates[3]}</div>
			<div>{candidates[4]}</div>
			<div>{candidates[5]}</div>
		</div>
		<div class={style.candidateInner}>
			<div>{candidates[6]}</div>
			<div>{candidates[7]}</div>
			<div>{candidates[8]}</div>
		</div>
	</span>
}

const Square = ({
	square,
	settings: {
		candidateMode,
		showMistakes,
		filterCandidates,
		toggleFilterCandidates,
		toggleCandidateMode
	}
}) => {
	let className = square.isUserProvided ? style.userSquare : style.defaultSquare;
	
	if (showMistakes && square.isIncorrect) className += " " + style.incorrectSquare;
	const candidates = filterCandidates ? ['1', '2', '3', '4', '5', '6', '7', '8', '9'] : square.candidates;
	return <ButtonWithModal
		class={`${style.square} ${className}`} 
		disabled={!square.isUserProvided} 
		buttonText={<SquareClickButton id={square.index}>
				{square.displayValue}
			</SquareClickButton>}
	>
		{candidates.map((candidate) => {
			if (candidateMode) {
				return <CandidateLink value={candidate} squareId={square.index}>
					{candidate}
				</CandidateLink>
			}
			return <GameLink value={candidate} index={square.index}>
				{candidate}
			</GameLink>
		})}

		{!candidateMode && 
			<GameLink
				value={'.'}
				index={square.index}
			>
				Remove guess
			</GameLink>}
		<button onClick={toggleFilterCandidates}>
			{filterCandidates ? "Hide invalid candidates" : "Show all candidates"}
		</button>

		<button onClick={toggleCandidateMode}>
			{candidateMode ? "Switch to Answer Mode" : "Switch to Candidate Mode"}
		</button>
	</ButtonWithModal>
}

export default Square;