import Submission from "../models/Submission.js";

export const createSubmission = async (req, res) => {
  const { userId, carModel, price, phoneNumber, city } = req.body;
  const imageUrls = req.body.imageUrls || [];

  try {

    if (!carModel || !price || !phoneNumber || !city) {

      return res.status(400).json({ message: 'All fields are required!' });

    }

    const images = imageUrls.map((image) => {

      if (!/^data:image\/(png|jpeg|jpg|gif);base64,/.test(image)) {
        throw new Error('Invalid Base64 image format');
      }

      return image;
    });


    const submission = await Submission.create({
      user: userId,
      carModel,
      price,
      phoneNumber,
      city,
      imageUrls: images,
    });

    return res.status(200).json({ message: "Submission successful", submission: submission });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error adding car', error: error.message });

  }
};
