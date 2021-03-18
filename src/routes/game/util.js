export const toURLValue = (val) => {
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

export const toDisplayValue = (val) => {
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

export const toSolutionValue = (gameArr) => {
	return gameArr.slice(0, 81).map((x) => {
		if (Number.isNaN(Number(x))) return '.';
		return x;
	}).join('')
} 

export function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}