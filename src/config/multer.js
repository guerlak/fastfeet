const { randomBytes } = require('crypto');

const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'temp', 'uploads'),
        filename: (req, file, cb) => {
            // eslint-disable-next-line no-unused-expressions
            crypto,
                randomBytes(16, (err, res) => {
                    if (err) return cb(err);
                    return cb(
                        null,
                        res.toString('hex') + extname(file.originalname)
                    );
                });
        }
    })
};
