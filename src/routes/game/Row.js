import { h } from 'preact';
import style from './style.css';
import Square from './Square.js';

const Row = ({ squares, settings }) => {
	return <div class={style.row}>
		{ squares.map(sq => <Square square={sq} settings={settings} />) }
	</div>
}

export default Row;