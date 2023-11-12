const DetailComment = require('../DetailComment');

describe('a DetailThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      comments: {},
    };

    expect(() => new DetailComment(payload)).toThrowError('DETAIL_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should remap comments data correctly', () => {
    const payload = {
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding1',
          date: '2023-10-15T08:57:58.221Z',
          content: 'sebuah comment',
          is_deleted: false,
        },
        {
          id: 'comment-yksuCoxM2s4MMrZJO-qVD',
          username: 'dicoding2',
          date: '2023-10-15T08:58:20.008Z',
          content: 'sebuah comment :v',
          is_deleted: true,
        },
      ],
    };

    const { comments } = new DetailComment(payload);

    const expectedComment = [
      {
        id: 'comment-123',
        username: 'dicoding1',
        date: '2023-10-15T08:57:58.221Z',
        content: 'sebuah comment',
      },
      {
        id: 'comment-yksuCoxM2s4MMrZJO-qVD',
        username: 'dicoding2',
        date: '2023-10-15T08:58:20.008Z',
        content: '**komentar telah dihapus**',
      },
    ];

    expect(comments).toEqual(expectedComment);
  });

  it('should create DetailComment object correctly', () => {
    const payload = {
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding1',
          date: '2023-10-15T08:57:58.221Z',
          content: 'sebuah comment',
        },
        {
          id: 'comment-yksuCoxM2s4MMrZJO-qVD',
          username: 'dicoding2',
          date: '2023-10-15T08:58:20.008Z',
          content: '**komentar telah dihapus**',
        },
      ],
    };

    const { comments } = new DetailComment(payload);

    expect(comments).toEqual(payload.comments);
  });
});
