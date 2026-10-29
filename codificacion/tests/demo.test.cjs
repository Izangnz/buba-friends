// DOM/storage and clock simulations; does not replace visual/device checks.
require('./interaction.test.cjs');
require('./stories.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./music-search.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});
