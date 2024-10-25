const imageServices = require("../services/imageServices");
const formidable = require("formidable");

const uploadImages = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Error parsing form data" });
    }

    try {
      if (!files.image || files.image.length === 0) {
        return res.status(400).json({ error: "No image file provided" });
      }

      const uploadPromises = files.image.map(async (file) => {
        // Get file path
        const filePath = file.filepath;
        // file name + timestamp
        const fileName = `${Date.now()}-${file.originalFilename}`;
        // Extract userId from fields
        const userId = fields.userId;
        // Upload image and get URL
        return await imageServices.uploadImage(filePath, fileName, ...userId);
      });

      const imageUrls = await Promise.all(uploadPromises);

      res.status(201).json({ imageUrls });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = { uploadImages };

// const analyzeImage = async (req, res) => {
//   try {

//     res.status(200).json(prediction);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
