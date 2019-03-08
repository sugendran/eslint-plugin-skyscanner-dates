// For some guidance about how to use Danger please check: https://confluence.skyscannertools.net/x/0g6XAg

// "danger-plugin-toolbox" is not defined in the project, it is in the Danger JS Docker image.
// That's why "import/no-unresolved" must be disabled
/* eslint-disable import/no-unresolved */
const {
  // isTrivial,
  // commonChangelog,
  jsLockfile,
  jsTestShortcuts,
  commonFileExists,
} = require('danger-plugin-toolbox');

// Uncomment if you wish to use a changelog with your library
/*
//
// Make sure "CHANGELOG.md" has been updated.
//
if (!isTrivial) {
  commonChangelog();
}
*/

//
// If dependencies change (changes in "package.json"), "package-lock.json" also must be updated.
//
jsLockfile();


//
// Check if there are test shortcuts (skipped/focused tests).
//
jsTestShortcuts({ logTypeFocused: 'fail' });


//
// Make sure "package-lock.json" files exist
//
commonFileExists('package-lock.json', { logType: 'fail' });
