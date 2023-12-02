import multer from "multer";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import { nanoid } from "nanoid";

const isAccessible = (path) =>
  fs
    .access(path)
    .then(() => true)
    .catch(() => false);

const setupFolder = async (path) => {
  const folderAvailable = await isAccessible(path);
  if (!folderAvailable) {
    try {
      await fs.mkdir(path);
    } catch (e) {
      console.error("no permissions!", e);
      process.exit(1);
    }
  }
};

export const initUploadFolders = async () => {
  await setupFolder(tempDir);
  await setupFolder(storeImageDir);
};

const tempDir = path.join(process.cwd(), "tmp");
const storeImageDir = path.join(process.cwd(), "public/avatars");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}${path.extname(file.originalname)}`);
  },
});

const extensionWhiteList = [".jpg", ".jpeg", ".png", ".gif"];
const mimetypeWhiteList = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

const uploadMiddleware = multer({
  storage,
  fileFilter: async (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const mimetype = file.mimetype;
    if (
      !extensionWhiteList.includes(extension) ||
      !mimetypeWhiteList.includes(mimetype)
    ) {
      return cb(null, false);
    }
    return cb(null, true);
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

const AVATAR_WIDTH = 250;
const AVATAR_HEIGHT = 250;

export const processAndValidateImage = async (tempFilePath) => {
  try {
    const image = await Jimp.read(tempFilePath);
    const w = image.getWidth();
    const h = image.getHeight();

    const cropWidth = Math.min(w, AVATAR_WIDTH);
    const cropHeight = Math.min(h, AVATAR_HEIGHT);

    const centerX = Math.round((w - cropWidth) / 2);
    const centerY = Math.round((h - cropHeight) / 2);

    await image
      .rotate(360)
      .crop(centerX, centerY, cropWidth, cropHeight)
      .resize(AVATAR_WIDTH, AVATAR_HEIGHT)
      .writeAsync(tempFilePath);

    const newFileName = nanoid() + path.extname(tempFilePath);
    const newFilePath = path.join(storeImageDir, newFileName);

    await fs.rename(tempFilePath, newFilePath);
    return newFilePath;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default uploadMiddleware;
