exports.up = (pgm) => {
  pgm.addConstraint('thread_comments', 'fk_comments.thread_threads.id', 'FOREIGN KEY(thread) REFERENCES threads(id) ON DELETE CASCADE');
  pgm.addConstraint('thread_comments', 'fk_comments.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropConstraint('fk_comments.thread_threads.id');
  pgm.dropConstraint('fk_comments.owner_users.id');
};
