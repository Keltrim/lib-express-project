import multer from 'multer';

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'book-files/img')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uploadBook = multer({ storage: storage });

export { uploadBook };