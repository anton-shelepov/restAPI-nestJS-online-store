import { diskStorage } from "multer";

export const FileInterceptorOptions = {
    storage: diskStorage({
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
} 