var path = require('path'),
	rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
    JWTSECRET: 'CFEQGRDEFGERGRE',
		rootPath: rootPath,
		db: process.env.DB,
		port: process.env.PORT || 3000
	},
	production: {
    JWTSECRET: 'CFEQGRDEFGERGRE',
		rootPath: rootPath,
		db: process.env.DB,
		port: process.env.PORT || 80
	}
};
