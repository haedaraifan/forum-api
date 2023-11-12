const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const CommentRepository = require('../../Domains/comments/CommentRepository');
const AddedComment = require('../../Domains/comments/entities/AddedComment');

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addComment(newComment) {
    const { content, thread, owner } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO thread_comments VALUES($1, $2, $3, $4, FALSE ,$5, $5) RETURNING id, content, owner',
      values: [id, thread, content, owner, createdAt],
    };

    const { rows } = await this._pool.query(query);

    return new AddedComment(rows[0]);
  }

  async checkAvailabilityComment(comment) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1',
      values: [comment],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new NotFoundError('komentar tidak ditemukan');
    }
  }

  async verifyCommentOwner(comment, owner) {
    const query = {
      text: 'SELECT * FROM thread_comments WHERE id = $1 AND owner = $2',
      values: [comment, owner],
    };

    const result = await this._pool.query(query);

    if (result.rowCount === 0) {
      throw new AuthorizationError('anda tidak dapat menghapus komentar milik orang lain');
    }
  }

  async deleteComment(comment) {
    const query = {
      text: 'UPDATE thread_comments SET is_deleted = TRUE WHERE id = $1',
      values: [comment],
    };

    await this._pool.query(query);
  }

  async getCommentsThread(thread) {
    const query = {
      text: 'SELECT thread_comments.id, users.username, thread_comments.created_at as date, thread_comments.content, thread_comments.is_deleted FROM thread_comments LEFT JOIN users ON users.id = thread_comments.owner WHERE thread = $1 ORDER BY thread_comments.created_at',
      values: [thread],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = CommentRepositoryPostgres;
