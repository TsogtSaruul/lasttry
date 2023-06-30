const jwt = require("jsonwebtoken");


const secret = 'test';

const auth = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];

		let decodedToken = jwt.verify(token, secret);

		req.userId = decodedToken?.id;

		next();
	} catch (error) {
		console.log(error);
	}
};

export default auth;
