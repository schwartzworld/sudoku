import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import style from './style.css';
import s from '../../sudoku/index.js';
import Match from 'preact-router/match';

import useSettings from './hooks/useSettings.js';
import useGameString from './hooks/useGameString.js';
import Row from './Row.js';
import FilterCandidatesSettings from './FilterCandidatesSettings.js';
import CandidatesToggle from './CandidatesToggle.jsx';
import ShowMistakesSettings from './ShowMistakesSettings.js';
import { toURLValue, toDisplayValue, toSolutionValue, copyToClipboard } from './util.js'
import p from './presentationalComponents.js'

const { BoardThird, Settings } = p;

const newGame = (gameStr) => {
	try {

		// TODO Simplify / Factor this function
		const split = gameStr.split('');
		const solutionValue = toSolutionValue(split);
		const solution = s.solve(solutionValue);

		const candidates = s.get_candidates(solutionValue).flat();
		const parsed = split.slice(0, 81).map(toDisplayValue);
		const gameIsAlreadyWon = parsed.join('') === solution;
		const gameArr = parsed.map((value, index) => {
			const correctAnswer = solution[index];

			return {
				index,
				isUserProvided: Number.isNaN(Number(split[index])),
				displayValue: value === '.' ? null : value,
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
			rows, solutionValue, gameIsAlreadyWon
		}
	} catch (e) {
		console.error(e);
		return { rows: [] }
	}
}

const GameSelectionMenu = () => {
	return <div class={style.game}>
		<h3>Choose your difficulty</h3>
		<ul class={style.selection}>
			<li><a href="/c/easy">Easy</a></li>
			<li><a href="/c/medium">Medium</a></li>
			<li><a href="/c/hard">Hard</a></li>
			<li><a href="/c/very-hard">Very Hard</a></li>
			<li><a href="/c/insane">Insane</a></li>
			<li><a href="/c/inhuman">Inhuman</a></li>
		</ul>
	</div>
}

const ShareGameButton = ({ game, children }) => {
	const replaced = game.replace(/\./g, "k");
	const copy = () => {
		copyToClipboard(`${window.location.origin}/?g=${replaced}`);
	}
	return <button onClick={copy}>
		{children}
	</button>
}

const Game = ({ game }) => {
	const settings = useSettings();
	const { rows, solutionValue, gameIsAlreadyWon } = newGame(game);
	if (!game) return <GameSelectionMenu />
	if (!rows.length) return <div class={style.game}>Invalid</div>

	return 	<>
		{ gameIsAlreadyWon && <h2>You won!</h2> }
		<div class={style.game}>
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
			<div class={style.share}>
				<ShareGameButton game={game}>
					Share game from current state
				</ShareGameButton>
				<ShareGameButton game={solutionValue}>
					Share game from initial state
				</ShareGameButton>
			</div>
		<Settings>
			<ShowMistakesSettings show={settings.showMistakes} onChange={settings.toggleShowMistakes} />
			<FilterCandidatesSettings show={settings.filterCandidates} onChange={settings.toggleFilterCandidates} />
			<CandidatesToggle show={settings.candidateMode} onChange={settings.toggleCandidateMode} />
		</Settings>
		</div>
	</>;
}

export default Game;
