/**
 * Concatenates a list of strings into a single line,
 * with a whitespace character as separator.
 *
 * @param fragments Text fragments to join
 */
export function singleLine(...fragments: string[]) {
	return fragments.join(' ');
}

/**
 * Concatenates a list of strings into a multi-line string,
 * with a line break character (`LF`) as separator.
 *
 * @param fragments Text fragments to join
 */
export function multiLine(...fragments: string[]) {
	return fragments.join('\n');
}

/**
 * Pads a string with a given character to a given length:
 *
 * - If the string is longer than the given length, it is truncated.
 * - If the string is shorter than the given length, it is padded.
 * - If the string is exactly the given length, it is returned unchanged.
 * - If the padding character is not specified, a space is used.
 * - If the padding character is longer than one character, only the first character is used.
 * - If the padding type is not specified, the string is padded on the left.
 * - If the padding type is `left`, the string is padded on the left.
 * - If the padding type is `right`, the string is padded on the right.
 * - If the padding type is `both`, the string is padded on both sides.
 * - If the padding type is not `left`, `right`, or `both`, the string is padded on the left.
 *
 * @param str The string to pad
 * @param length The length to pad to
 * @param padStr The character to pad with
 * @param type The type of padding to perform
 */
export function pad(
	str: string,
	length: number,
	padStr = ' ',
	type: 'left' | 'right' | 'both' = 'left',
) {
	const _length = ~~length;

	let _padStr = padStr;
	if (!_padStr) {
		_padStr = ' ';
	} else if (_padStr.length > 1) {
		_padStr = _padStr.charAt(0);
	}

	let padlen = 0;
	switch (type) {
		case 'right':
			padlen = _length - str.length;
			return str + _padStr.repeat(padlen);
		case 'both':
			padlen = _length - str.length;
			return (
				_padStr.repeat(Math.ceil(padlen / 2)) +
				str +
				_padStr.repeat(Math.floor(padlen / 2))
			);
		default: // 'left'
			padlen = _length - str.length;
			return _padStr.repeat(padlen) + str;
	}
}

/**
 * Pads a string with a given character to a given length on the left.
 *
 * See the `pad` function for more details.
 *
 * @param str The string to pad
 * @param length The length to pad to
 * @param padStr The character to pad with
 */
export function lpad(str: string, length: number, padStr?: string) {
	return pad(str, length, padStr);
}

/**
 * Pads a string with a given character to a given length on the right.
 *
 * See the `pad` function for more details.
 *
 * @param str The string to pad
 * @param length The length to pad to
 * @param padStr The character to pad with
 */
export function rpad(str: string, length: number, padStr?: string) {
	return pad(str, length, padStr, 'right');
}

/**
 * Pads a string with a given character to a given length on both sides:
 *
 * See the `pad` function for more details.
 *
 * @param str The string to pad
 * @param length The length to pad to
 * @param padStr The character to pad with
 */
export function lrpad(str: string, length: number, padStr?: string) {
	return pad(str, length, padStr, 'both');
}

/**
 * Creates a text banner with a given message and title, suitable
 * for diaplying in console output.
 *
 * @param message The message to display in the banner
 * @param title (Optional) The title to display in the banner
 */
export function makeBanner(message: string | string[], title?: string) {
	let _message = message;
	if (!Array.isArray(_message)) {
		_message = _message.split('\n');
	}

	let lines = [];
	const len = Math.max.apply(
		null,
		_message.map((line) => line.length),
	);
	const topLine = `+--${pad('', len, '-')}--+`;
	const separator = `|  ${pad('', len, '')}  |`;

	lines.push(topLine);
	if (title) {
		lines.push(`|  ${lrpad(title, len)}  |`);
		lines.push(topLine);
	}
	lines.push(separator);

	lines = [...lines, ..._message.map((line) => `|  ${rpad(line, len)}  |`)];

	lines.push(separator);
	lines.push(topLine);
	return lines;
}
