const replaceByIndex = (str, index, value) => {
	let newStr = String(str);
	const x = newStr.split('');
	x[index] = value;
	return x.join('');
}

// program to convert decimal to binary
function convertToBinary(x) {
    let bin = 0;
    let rem, i = 1, step = 1;
    while (x != 0) {
        rem = x % 2;
        x = parseInt(x / 2);
        bin = bin + rem * i;
        i = i * 10;
    }
    return String(bin).padStart(9, '0');
}


const useCandidateHref = (squareId, value) => { // 1, 4
	const index = value - 1;
	const { search, ...rest } = window.location;
	const params = new URLSearchParams(search); // ?1=323
	const binary = convertToBinary(params.get(squareId) || 0); // "101000011"
	const d = binary[index]; // "0"
	
	const candidate = Boolean(Number(d)); // false
	const replacer = candidate ? '0' : '1';
	const replaced = replaceByIndex(binary, index, replacer)
	params.set(squareId, parseInt(replaced, 2));

	const href = "?" + params.toString();
	return {candidate, href, binary};
}

export default useCandidateHref;