// Multer | Sam Meech-Ward's Code
import multer from 'multer'
const storage = multer.memoryStorage()
export const multerUpload = multer({ storage: storage })
// End Of Sam Meech-Ward's Code
