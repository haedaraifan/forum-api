const CommentRepository = require('../../../Domains/comments/CommentRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const ShowDetailThreadUseCase = require('../ShowDetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  it('should get return detail thread correctly', async () => {
    const useCasePayload = {
      threadId: 'thread-123',
    };

    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    mockThreadRepository.checkAvailabilityThread = jest.fn(() => Promise.resolve());
    mockThreadRepository.getDetailThread = jest.fn(() => ({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'halo dunia.',
      date: '2023-10-16 20.00',
      username: 'dicoding',
    }));
    mockCommentRepository.getCommentsThread = jest.fn(() => ([
      {
        id: 'comment-123',
        username: 'dicoding',
        date: '2023-10-16 21.00',
        content: 'sebuah comment',
        is_deleted: 0,
      },
      {
        id: 'comment-124',
        username: 'dicoding',
        date: '2023-10-16 22.00',
        content: 'sebuah comment',
        is_deleted: 1,
      },
    ]));

    const showDetailThreadUseCase = new ShowDetailThreadUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
    });

    const detailThread = await showDetailThreadUseCase.execute(useCasePayload);

    expect(mockThreadRepository.checkAvailabilityThread)
      .toBeCalledWith('thread-123');
    expect(mockThreadRepository.getDetailThread)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(mockCommentRepository.getCommentsThread)
      .toHaveBeenCalledWith(useCasePayload.threadId);
    expect(detailThread).toStrictEqual({
      thread: {
        id: 'thread-123',
        title: 'sebuah thread',
        body: 'halo dunia.',
        date: '2023-10-16 20.00',
        username: 'dicoding',
        comments: [
          {
            id: 'comment-123',
            username: 'dicoding',
            date: '2023-10-16 21.00',
            content: 'sebuah comment',
          },
          {
            id: 'comment-124',
            username: 'dicoding',
            date: '2023-10-16 22.00',
            content: '**komentar telah dihapus**',
          },
        ],
      },
    });
  });
});
