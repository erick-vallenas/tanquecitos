import * as migration_20260313_202323_add_blog_posts from './20260313_202323_add_blog_posts';

export const migrations = [
  {
    up: migration_20260313_202323_add_blog_posts.up,
    down: migration_20260313_202323_add_blog_posts.down,
    name: '20260313_202323_add_blog_posts'
  },
];
