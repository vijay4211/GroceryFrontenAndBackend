import multer from "multer";

// const storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${Date.now()} ${file.originalname}
//        }`
//     );
//   },
// });

// export const upload = multer({ storage: storage });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + " " + file.originalname;
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage: storage });
