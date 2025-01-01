import formidable from "formidable";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function uploadProductImage(req, res, next) {
  const form = formidable({
    uploadDir: path.join(__dirname, "../public/images/products"),
    keepExtensions: true, // Để giữ lại phần mở rộng file
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }
    // Lưu trữ thông tin `fields` và `files` trong request để dùng sau
    req.body = fields;
    req.files = files;

    // Gọi middleware tiếp theo
    next();
  });
}

export async function uploadCategoryImage(req, res, next) {
  const form = formidable({
    uploadDir: path.join(__dirname, "../public/images/categories"),
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: "Error parsing form data" });
    }

    req.body = fields;
    req.files = files;

    next();
  });
}
