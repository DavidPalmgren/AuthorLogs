const Novel = require('../models/novelModel');

const getAllNovels = async (req, res) => {
  try {
    const novels = await Novel.getAllNovels();
    res.json(novels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const saveNovelContent = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNovel = await Novel.createNovel(title, content);
    res.status(201).json(newNovel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllNovels, saveNovelContent };
