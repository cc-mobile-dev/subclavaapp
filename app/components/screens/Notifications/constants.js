export const getMessage = type => {
  if (type === 'notification.added_to_channel') {
    return `has been added to your chatroom`;
  } else if (type === 'notification.removed_from_channel') {
    return `has been removed from your chatroom`;
  } else if (type === 'notification.message_new') {
    return `has added a new message`;
  } else if (type === 'notification.mark_read') {
    return `has read your message`;
  } else if (type === 'notification.invited') {
    return `has been invited`;
  } else if (type === 'notification.invite_accepted') {
    return `invite has been accepted`;
  } else if (type === 'join') {
    return `has joined!`
  }
};

export const getNotificationMessage = (type, chatroom) => {
  switch (type) {
    case 'mention':
      return 'mentioned you in a message.';
    case 'like':
      return 'liked your message.';
    case 'react':
      return 'reacted to your message.';
    case 'invite':
      return 'invited you to their chatroom.';
    case 'favorite':
      return 'favorited your chatroom.';
    case 'join':
      return `joined ${chatroom.name}! Now at ${chatroom.memberCount} ${chatroom.memberCount === 1 ? 'member.' : 'members.'}`;
    case 'leave':
      return `left ${chatroom.name}! Now at ${chatroom.memberCount} ${chatroom.memberCount === 1 ? 'member.' : 'members.'}`;
    case 'full':
      return `has reached it's member limit.`;
    case 'live':
      return `@${chatroom.admin.username} is live!`
    default:
      return '';
  }
}
