-- Function to notify about new messages
CREATE OR REPLACE FUNCTION notify_new_message() RETURNS TRIGGER AS $$
BEGIN
  -- Ensure all fields are included in notification
  PERFORM pg_notify(
    'new_messages',
    json_build_object(
      'id', NEW.id::text, -- Ensure ID is converted to text
      'sender_id', NEW.sender_id,
      'receiver_id', NEW.receiver_id,
      'content', NEW.content,
      'created_at', NEW.created_at,
      'updated_at', NEW.updated_at,
      'sender_email', (SELECT email FROM neon_auth.users_sync WHERE id = NEW.sender_id)
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS messages_notify_trigger ON messages;

-- Create trigger for new messages
CREATE TRIGGER messages_notify_trigger
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_message();