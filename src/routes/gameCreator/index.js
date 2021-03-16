import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style.css';

import s from '../../sudoku/index.js';


// Note: `user` comes from the URL, courtesy of our router
const GameCreator = ({ difficulty }) => {
	try {
		const gameStr = s.to_url();
		return <div class={style.game}>
			<Link href={`/g/${gameStr}`}>
				<h3>Click to play</h3>
			</Link>
		</div>
	} catch (e) {
		return <div class={style.game}>
			{e}
		</div>
	}
}

export default GameCreator;
