export const onUserMentionSelect = (item) => {
    let currentText = this.state.currentText;
    // find where the handle began and replace it with the full username
    currentText = currentText.slice(0, currentText.lastIndexOf('@')) + '@' + item.nickname + ' ';
    const taggingAllUsers = item.nickname === 'everyone';
    const mentionedUsers = taggingAllUsers ? uniq([...this.props.chatroomMembers]) : uniq([...this.state.mentionedUsers, ...[item]]);

    this.setState({
        currentText,
        usersSearchResults: [],
        // mentionedUsers: uniq([...this.state.mentionedUsers, ...[item]])
        mentionedUsers
    })
}