import { h } from 'preact';
import style from './style.css';
import s from '../../sudoku/index.js';

const BoardThird = ({ children }) => {
	return <div class={style.boardThird}>
		{ children }
	</div>
}

const Square = ({ square }) => {
	const className = square.isUserProvided ? style.userSquare : style.defaultSquare;
	return <button class={`${style.square} ${className}`} disabled={!square.isUserProvided}>
		{String(square.displayValue)}
	</button>
}

const Row = ({ squares }) => {
	return <div class={style.row}>
		{ squares.map(sq => <Square square={sq} />) }
	</div>
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
	return gameArr.map((x) => {
		if (Number.isNaN(Number(x))) return '.';
		return x;
	}).join('')
} 



const newGame = (gameStr) => {
	const split = gameStr.split('');
	const solutionValue = toSolutionValue(split);
	const solution = s.solve(solutionValue);
	const candidates = s.get_candidates(solutionValue).flat();
	const gameArr = split.map((value, index) => {
		const v = toDisplayValue(value);
		return {
			isUserProvided: Boolean(Number.isNaN(Number(value))),
			displayValue: v,
			correctAnswer: solution[index],
			candidates: candidates[index].split(''),
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

	const rows = solution ? [zero, one, two, three, four, five, six, seven, eight] : [];
	return {
		rows
	}
	
}

const Game = ({ game }) => {
	const { rows } = newGame(game);
	if (!rows.length) return <div class={style.game}>Invalid</div>
	return 	<div class={style.game}>
		<BoardThird>
			<Row squares={rows[0]} />
			<Row squares={rows[1]} />
			<Row squares={rows[2]} />
		</BoardThird>
		<BoardThird>
			<Row squares={rows[3]} />
			<Row squares={rows[4]} />
			<Row squares={rows[5]} />
		</BoardThird>
		<BoardThird>
			<Row squares={rows[6]} />
			<Row squares={rows[7]} />
			<Row squares={rows[8]} />
		</BoardThird>
	</div>;
}

export default Game;
