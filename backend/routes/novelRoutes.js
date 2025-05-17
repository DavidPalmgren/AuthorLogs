const express = require('express');
const router = express.Router();
const {
  getAllNovels,
  saveNovelContent,
} = require('../controllers/novelController');

router.get('/', getAllNovels);
router.post('/', saveNovelContent);

module.exports = router;
