import { h } from 'preact';
import style from './style.css';
import Game from '../game'

const Instructions = () => {
	return <div>
		<p>
			Millions of people enjoy the challenge of Sudoku. You can too!
		</p>
		<h3>How to Play</h3>

		<p>
			A Sudoku game consists of a 9x9 grid of numbers with some of the squares left blank.
			Your job is to fill out the missing numbers. The game is won when all rows, columns,
			and square (nine spaces each) is filled out with the numbers 1-9 with no repeats.
		</p>

		<p>

		</p>
	</div>
}

const Home = ({ params, matches }) => {
	const gameStr = matches['g'];
	return <div class={style.home}>
		<h1>Play Sudoku</h1>
		<Game game={gameStr} />
		<Instructions />
	</div>
};

export default Home;
