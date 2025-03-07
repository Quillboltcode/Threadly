import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and GIF allowed'));
  }
};

const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB per file
  files: 4 // Allow up to 4 images per post
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits
});

// Middleware for multiple images
export const handlePostImages = uploadImage.array('images', 4);
export const handleCommentImage = uploadImage.single('commentImage');
