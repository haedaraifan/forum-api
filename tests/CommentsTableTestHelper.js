/* istanbul ignore file */

const pool = require('../src/Infrastructures/database/postgres/pool');

const CommentsTableTestHelper = {
  async addComment({
    id = 'comment-123',
    content = 'sebuah komentar',
    thread = 'thread-123',
    owner = 'user-123',
    isDeleted = false,
  }) {
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4, $5, $6, $7)',
      values: [id, thread, content, owner, isDeleted, createdAt, updatedAt],
    };

    await pool.query(query);
  },

  async findCommentsById(id) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [id],
    };

    const { rows } = await pool.query(query);
    return rows;
  },

  async checkIsDeletedCommentsById(id) {
    const query = {
      text: 'SELECT is_deleted FROM thread_comments WHERE id = $1',
      values: [id],
    };

    const { rows } = await pool.query(query);
    return rows[0].is_deleted;
  },

  async deleteComment(id) {
    const query = {
      text: 'UPDATE thread_comments SET is_deleted = 1 WHERE id = $1',
      values: [id],
    };
    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM thread_comments WHERE 1 = 1');
  },
};

module.exports = CommentsTableTestHelper;
