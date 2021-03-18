import { h } from 'preact';
import style from './style.css';

import useGameString from './hooks/useGameString.js';
import { toURLValue } from './util.js';

const replaceByIndex = (str, index, value) => {
	let newStr = String(str);
	const x = newStr.split('');
	x[index] = toURLValue(value);
	return x.join('');
}

const GameLink = ({ index, value, children }) => {
	// TODO: Refactor to use url Query params rather than routes
	let gameStr = useGameString();
	const href = "/?g=" + replaceByIndex(gameStr, index, value);
	return <a class={style.gameLink} href={href}>{children}</a>
}

export default GameLink;