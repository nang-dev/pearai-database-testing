-- Drop existing foreign key constraints
ALTER TABLE friendships DROP CONSTRAINT IF EXISTS friendships_friend_id_fkey;
ALTER TABLE friendships DROP CONSTRAINT IF EXISTS friendships_user_id_fkey;

-- Add new foreign key constraints referencing users_sync
ALTER TABLE friendships
    ADD CONSTRAINT friendships_friend_id_fkey
    FOREIGN KEY (friend_id)
    REFERENCES neon_auth.users_sync(id);

ALTER TABLE friendships
    ADD CONSTRAINT friendships_user_id_fkey
    FOREIGN KEY (user_id)
    REFERENCES neon_auth.users_sync(id);