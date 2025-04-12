-- Drop existing foreign key constraints
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_sender_id_fkey;
ALTER TABLE messages DROP CONSTRAINT IF EXISTS messages_receiver_id_fkey;

-- Change column types from UUID to TEXT
ALTER TABLE messages
    ALTER COLUMN sender_id TYPE TEXT,
    ALTER COLUMN receiver_id TYPE TEXT;

-- Add new foreign key constraints referencing users_sync
ALTER TABLE messages
    ADD CONSTRAINT messages_sender_id_fkey
    FOREIGN KEY (sender_id)
    REFERENCES neon_auth.users_sync(id);

ALTER TABLE messages
    ADD CONSTRAINT messages_receiver_id_fkey
    FOREIGN KEY (receiver_id)
    REFERENCES neon_auth.users_sync(id);