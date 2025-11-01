// export default async (req, res) => {
//   const { reqHandler } = await import('../dist/portfolio/server/server.mjs');
//   return reqHandler(req, res);
// };
const path = require('path');

const serverDistPath = path.join(process.cwd(), 'dist/portfolio/server/server.mjs');

export default import(serverDistPath).then(module => module.app);