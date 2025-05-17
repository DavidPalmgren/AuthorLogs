const pool = require('../config/db');

const getAllNovels = async () => {
  const [rows] = await pool.query('SELECT * FROM novels');
  return rows;
};

const getNovelById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM novels WHERE id = ?', [id]);
  return rows[0];
};

const createNovel = async (title, content) => {
  const [result] = await pool.query(
    'INSERT INTO novels (title, content) VALUES (?, ?)',
    [title, content]
  );
  return { id: result.insertId, title, content };
};

const updateNovelContent = async (id, content) => {
  await pool.query(
    'UPDATE novels SET content = ?, updated_at = NOW() WHERE id = ?',
    [content, id]
  );
};

module.exports = {
  getAllNovels,
  getNovelById,
  createNovel,
  updateNovelContent,
};
