export * from './get-app-version';
export * from './safe-require';
export * from './drop-undefined';

export const PASSWORD_STRONG_REGEX =
	/((?=.*\d)|(?=.*\W+))(?![\.\s\n])(?=.*[A-Z])(?=.*[a-z]).{8,}/;
