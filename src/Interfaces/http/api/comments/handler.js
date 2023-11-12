const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');

class CommentHandler {
  constructor(container) {
    this._container = container;
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postCommentHandler(request, h) {
    const addCommentUseCase = this._container.getInstance(AddCommentUseCase.name);
    const { id: owner } = request.auth.credentials;
    const thread = request.params.threadId;
    const useCasePayload = {
      content: request.payload.content,
      thread,
      owner,
    };
    const addedComment = await addCommentUseCase.execute(useCasePayload);

    const respose = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });
    respose.code(201);
    return respose;
  }

  async deleteCommentHandler(request, h) {
    const deleteCommentUseCase = this._container.getInstance(DeleteCommentUseCase.name);
    const { id: owner } = request.auth.credentials;
    const thread = request.params.threadId;
    const comment = request.params.commentId;
    const useCasePayload = {
      thread,
      comment,
      owner,
    };
    await deleteCommentUseCase.execute(useCasePayload);

    const response = h.response({
      status: 'success',
    });
    return response;
  }
}

module.exports = CommentHandler;
