// DOM/storage and clock simulations; does not replace visual/device checks.
require('./interaction.test.cjs');
require('./stories.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./music-search.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./profile-photo.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./discover-layout.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./collections.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./personal-profile.test.cjs');

require('./conversations.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./cover-editor.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./conversation-swipe.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});

require('./discovery.test.cjs')().catch(e=>{console.error(e);process.exitCode=1;});
