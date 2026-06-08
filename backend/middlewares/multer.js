import multer from "multer";

// Use memoryStorage so req.file.buffer is available for direct Cloudinary stream upload.
// diskStorage without a `destination` writes to an OS temp dir whose path is unreliable on Windows.
const upload = multer({ storage: multer.memoryStorage() });

export default upload;