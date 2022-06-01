"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileInterceptorOptions = void 0;
const multer_1 = require("multer");
exports.FileInterceptorOptions = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/images',
        filename: (req, file, callback) => {
            const name = file.originalname.split('.')[0];
            const fileExtension = file.originalname.split('.')[1];
            const newFileName = name.split(" ").join('_') + '_' + Date.now() + '.' + fileExtension;
            callback(null, newFileName);
        }
    }),
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return callback(null, false);
        }
        callback(null, true);
    }
};
//# sourceMappingURL=file-interceptor-options.js.map