const AddComment = require('../../Domains/comments/entities/AddComment');

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const { thread } = useCasePayload;
    await this._threadRepository.checkAvailabilityThread(thread);
    const comment = new AddComment(useCasePayload);
    return this._commentRepository.addComment(comment);
  }
}

module.exports = AddCommentUseCase;
