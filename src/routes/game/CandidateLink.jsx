import { h } from 'preact';
import style from './style.css';

import useGameString from './hooks/useGameString.js';
import { toURLValue } from './util.js';
import useCandidateHref from './hooks/useCandidateHref.js'
const fromQuery = (bin) => {
	return convertToBinary(bin)
		.split('')
		.map((c, i) => {
			return {[i + 1]: Boolean(Number(c))};
		})
}

const toQuery = (candidateArr) => {
	return parseInt(candidateArr.reduce((str, item) => {
			if (item.false) return str + '0';
			return str + '1';
		}, ""), 2);
}


const CandidateLink = ({ value, children, squareId }) => {
	// TODO: Refactor to use url Query params rather than routes
	let {candidate, href} = useCandidateHref(squareId, value);
	const marked = candidate ? style.marked : '';
	return <a
		class={`${style.gameLink} ${marked}`}
		href={href}
	>
		{children}
	</a>
}

export default CandidateLink;