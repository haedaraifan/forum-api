const DetailThread = require('../../Domains/threads/entities/DetailThread');
const DetailComment = require('../../Domains/comments/entities/DetailComment');

class ShowDetailThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = new DetailThread(useCasePayload);
    await this._threadRepository.checkAvailabilityThread(threadId);
    const detailThread = await this._threadRepository.getDetailThread(threadId);
    const getCommentsThread = await this._commentRepository.getCommentsThread(threadId);
    detailThread.comments = new DetailComment({ comments: getCommentsThread }).comments;
    return {
      thread: detailThread,
    };
  }
}

module.exports = ShowDetailThreadUseCase;
