const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const cors = require('cors');

const server = jsonServer.create();

const router = jsonServer.router(path.resolve(__dirname, 'db.json'), { foreignKeySuffix: 'Id' });
//router.db._.id = 'userId';

server.use(jsonServer.defaults({}));
server.use(
	jsonServer.rewriter({
		'/comments?:id': '/comments?articleId=:id&_expand=user&_sort=id&_order=asc'
	})
);
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
	await new Promise((res) => {
		setTimeout(res, 800);
	});
	next();
});

// Эндпоинт для логина
server.post('/login', (req, res) => {
	try {
		const { username, password } = req.body;
		const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
		const { users = [] } = db;

		const userFromBd = users.find((user) => user.username === username && user.password === password);

		if (userFromBd) {
			return res.json(userFromBd);
		}

		return res.status(403).json({ message: 'User not found' });
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: e.message });
	}
});

// проверяем, авторизован ли пользователь
// eslint-disable-next-line
server.use((req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ message: 'AUTH ERROR' });
	}

	next();
});

server.use(router);
// cors C-TOTAL-COUNT from json-server
server.use(
	cors({
		origin: true,
		credentials: true,
		preflightContinue: false,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
	})
);
server.options('*', cors());

// запуск сервера
server.listen(8000, () => {
	console.log('server is running on 8000 port');
});
