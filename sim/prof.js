const {loadEngine, defaultCfg} = require('./engine');
const E = loadEngine();
const W = E.genWorld('ALPHA1', 6, {c2:2, relay:2});
const t0 = Date.now();
E.runCampaign(W, defaultCfg());
console.log('campaign', Date.now()-t0);
