const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        // resolve({
        //   url: result.url,
        //   id: result.public_id,
        // }); use if need object [{id:id, url: "http"}]
        resolve(result.url);
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};

exports.remove = (id) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(id);
  });
};
