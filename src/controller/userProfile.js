require("dotenv").config();

const userProfile = async (req, res) => {
  try {
    const { id, nome, email } = req.usuario;
    const profile = { id, nome, email };
    return res.json(profile);
  } catch (error) {
    return res.status(500).json({ message: "Unexpected server error!" });
  }
};

module.exports = {
  userProfile,
};
