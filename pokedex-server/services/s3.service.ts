import * as aws from 'aws-sdk';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';
import createError = require('http-errors');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const fileFilter = (req: any, file: any, callback: any) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    callback(null, true);
  } else {
    callback(new createError.BadRequest('Only image files are allowed'));
  }
};

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: 'jojo-pokedex',
    metadata: function (req: any, file: any, callback: any) {
      callback(null, { fieldName: 'TESTING_METADATA' });
    },
    key: function (req: any, file: any, callback: any) {
      callback(null, Date.now().toString());
    },
  }),
});

export { upload };

