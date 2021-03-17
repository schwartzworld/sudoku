import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';
import s from '../../sudoku/index.js';
import Match from 'preact-router/match';


const toURLValue = (val) => {
	switch (String(val)) {
		case '1':
			return 'a';
		case '2':
			return 'b';
		case '3':
			return 'c';
		case '4':
			return 'd';
		case '5':
			return 'e';
		case '6':
			return 'f';
		case '7':
			return 'g';
		case '8':
			return 'h';
		case '9':
			return 'i';
		case '.':
			return 'k';
		default:
			return null;
	}
}

const toDisplayValue = (val) => {
	if (!isNaN(Number(val))) return val;
	switch (val.toLowerCase()) {
		case 'a':
			return '1';
		case 'b':
			return '2';
		case 'c':
			return '3';
		case 'd':
			return '4';
		case 'e':
			return '5';
		case 'f':
			return '6';
		case 'g':
			return '7';
		case 'h':
			return '8';
		case 'i':
			return '9';
		case 'k':
			return '.';
		default:
			return null;
	}
}

const toSolutionValue = (gameArr) => {
	return gameArr.slice(0, 81).map((x) => {
		if (Number.isNaN(Number(x))) return '.';
		return x;
	}).join('')
} 

const BoardThird = ({ children }) => {
	return <div class={style.boardThird}>
		{ children }
	</div>
};

const Settings = ({ children }) => {
	return <div class={style.settings}>
		{children}
	</div>
}

const useHideable = () => {
	const { pathname } = window.location;
	const [show, setShow] = useState(false);
	const onOpen = () => {
		setShow(true);
	}
	const onClose = () => {
		setShow(false);
	}

	useEffect(() => {
		onClose();
	}, [pathname])
	return {
		show,
		onOpen,
		onClose,
	}
}

const ButtonWithModal = ({ children, buttonText, ...buttonProps }) => {
	const { show, onOpen, onClose } = useHideable();
	// todo: focus modal when opened
	return <>
		{show && <div class={style.modalWrapper}>
			<div class={style.modalInner}>
				<div>
					{children}
				</div>
				<button onClick={onClose}>close</button>
			</div>
		</div>}
		<button onClick={onOpen} {...buttonProps}>
			{buttonText}
		</button>
	</>
}

const replaceByIndex = (str, index, value) => {
	let newStr = String(str);
	const x = newStr.split('');
	x[index] = toURLValue(value);
	return x.join('');
}

const useGameString = () => {
	const { pathname } = window.location;
	return pathname.split('/').filter(Boolean)[1];
}

const GameLink = ({ index, value, children }) => {
	let gameStr = useGameString();
	const href = "/g/" + replaceByIndex(gameStr, index, value);
	return <a class={style.gameLink} href={href}>{children}</a>
}

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

const Row = ({ squares, settings }) => {
	return <div class={style.row}>
		{ squares.map(sq => <Square square={sq} settings={settings} />) }
	</div>
}



const newGame = (gameStr) => {
	try {
		const split = gameStr.split('');
		const solutionValue = toSolutionValue(split);
		const solution = s.solve(solutionValue);

		const gameIsAlreadyWon = solutionValue === solution;
		const candidates = s.get_candidates(solutionValue).flat();
		const parsed = split.slice(0, 81).map(toDisplayValue)
		const gameArr = parsed.map((value, index) => {
			const correctAnswer = solution[index];

			return {
				index,
				isUserProvided: Number.isNaN(Number(split[index])),
				displayValue: value,
				correctAnswer,
				candidates: candidates[index].split(''),
				isIncorrect: value !== '.' && String(correctAnswer) !== String(value),
			}
		});
		const zero = gameArr.slice(0, 9);
		const one = gameArr.slice(9, 18);
		const two = gameArr.slice(18, 27);
		const three = gameArr.slice(27, 36);
		const four = gameArr.slice(36, 45);
		const five = gameArr.slice(45, 54);
		const six = gameArr.slice(54, 63);
		const seven = gameArr.slice(63, 72);
		const eight = gameArr.slice(72, 81);

		const rows = [zero, one, two, three, four, five, six, seven, eight];
		return {
			rows
		}
	} catch (e) {
		console.error(e);
		return { rows: [] }
	}
}

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

const ShowMistakesSettings = ({ show = false, onChange }) => {
	return <label for="showMistakes">
		Show Mistakes
		{show ? <button id="showMistakes" onClick={onChange}>Hide mistakes</button> :
				<button id="showMistakes" onClick={onChange}>show mistakes</button>}
	</label>
}

const FilterCandidatesSettings = ({ show = false, onChange }) => {
	return <label for="filterCandidates">
		Only show valid candidates
		{show ? <button id="filterCandidates" onClick={onChange}>Hide invalid candidates</button> :
				<button id="filterCandidates" onClick={onChange}>Show all candidates</button>}
	</label>
}
			

const Game = ({ game }) => {
	const settings = useSettings();
	const { rows, gameIsAlreadyWon } = newGame(game);
	if (gameIsAlreadyWon) return <div class={style.game}>Congrats! You won!</div>
	if (!rows.length) return <div class={style.game}>Invalid</div>

	return 	<div class={style.game}>
		<BoardThird>
			<Row squares={rows[0]} settings={settings} />
			<Row squares={rows[1]} settings={settings} />
			<Row squares={rows[2]} settings={settings} />
		</BoardThird>
		<BoardThird>
			<Row squares={rows[3]} settings={settings} />
			<Row squares={rows[4]} settings={settings} />
			<Row squares={rows[5]} settings={settings} />
		</BoardThird>
		<BoardThird>
			<Row squares={rows[6]} settings={settings} />
			<Row squares={rows[7]} settings={settings} />
			<Row squares={rows[8]} settings={settings} />
		</BoardThird>
		<Settings>
			<ShowMistakesSettings show={settings.showMistakes} onChange={settings.toggleShowMistakes} />
			<FilterCandidatesSettings show={settings.filterCandidates} onChange={settings.toggleFilterCandidates} />
		</Settings>
	</div>;
}

export default Game;
