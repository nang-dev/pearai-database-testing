import { useUser } from '@stackframe/stack';
import { useState, useEffect } from 'react';

interface Friend {
  id: string;
  email: string;
  status: string;
  created_at: string;
  user_id: string;
}

interface ChatSidebarProps {
  onSelectFriend: (friend: Friend) => void;
  selectedFriendId?: string;
}

export default function ChatSidebar({ onSelectFriend, selectedFriendId }: ChatSidebarProps) {
  const user = useUser({ or: 'redirect' });
  const [friends, setFriends] = useState<Friend[]>([]);
  const [newFriendEmail, setNewFriendEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch('/api/friends');
      if (!response.ok) throw new Error('Failed to fetch friends');
      const data = await response.json();
      setFriends(data);
    } catch (err) {
      console.error('Error fetching friends:', err);
      setError('Failed to load friends');
    }
  };

  const sendFriendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendEmail: newFriendEmail }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send friend request');
      }

      setNewFriendEmail('');
      fetchFriends(); // Refresh friends list
    } catch (err) {
      console.error('Error sending friend request:', err);
      setError(err instanceof Error ? err.message : 'Failed to send friend request');
    }
  };

  const handleAcceptRequest = async (friendId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch('/api/friends/accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId }),
      });

      if (!response.ok) {
        throw new Error('Failed to accept friend request');
      }

      fetchFriends(); // Refresh friends list
    } catch (err) {
      console.error('Error accepting friend request:', err);
      setError('Failed to accept friend request');
    }
  };

  const handleRejectRequest = async (friendId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch('/api/friends/reject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId }),
      });

      if (!response.ok) {
        throw new Error('Failed to reject friend request');
      }

      fetchFriends(); // Refresh friends list
    } catch (err) {
      console.error('Error rejecting friend request:', err);
      setError('Failed to reject friend request');
    }
  };

  return (
    <div className="w-64 h-screen bg-gray-100 p-4 border-r border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add Friend</h2>
        <form onSubmit={sendFriendRequest} className="space-y-2">
          <input
            type="email"
            value={newFriendEmail}
            onChange={(e) => setNewFriendEmail(e.target.value)}
            placeholder="Friend's email"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Send Request
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Friends</h2>
        <div className="space-y-2">
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => onSelectFriend(friend)}
              className={`p-2 rounded cursor-pointer ${
                selectedFriendId === friend.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
            >
              <div className="flex flex-col space-y-1">
                <p className="truncate">{friend.email}</p>
                {friend.status === 'pending' && (
                  <div className="flex flex-col space-y-2">
                    {/* Show accept/reject buttons only to the recipient */}
                    {friend.user_id !== user?.id && (
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => handleAcceptRequest(friend.user_id, e)}
                          className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => handleRejectRequest(friend.user_id, e)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    <span className="text-xs text-gray-500">
                      {friend.user_id === user?.id ? 'Request Sent' : 'Pending Request'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          {friends.length === 0 && (
            <p className="text-gray-500 text-sm">No friends yet</p>
          )}
        </div>
      </div>
    </div>
  );
}