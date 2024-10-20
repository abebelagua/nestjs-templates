import * as path from 'path';

import { safeRequire } from './safe-require';

const CWD = process.cwd();
const CD_UP = '..';
const PACKAGE_JSON = 'package.json';

/**
 * Load the version of the app from the `package.json` file.
 */
export function getAppVersion() {
	const packageFile = getPackageJson();
	return packageFile.version;
}

/**
 * Load the version `package.json` file.
 */
export function getPackageJson() {
	const packageJson = safeRequire(
		path.join(CWD, PACKAGE_JSON),
		path.join(CWD, CD_UP, PACKAGE_JSON),
		path.join(CWD, CD_UP, CD_UP, PACKAGE_JSON),
	);
	return packageJson;
}
