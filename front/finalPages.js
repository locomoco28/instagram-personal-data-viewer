/*
class pageComments extends React.Component {
    render() {
        let comments = [];
        window.displayData['comments.json'].forEach(item => {
            comments.push(item);
        });
        return e(
            'div',
            {},
            e('h1', {}, 'Your Comments'),
            e('p', {}, 'Comments: idek')
        );
    }
}
*/

class pageMessages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeChat: null
        };

        this.openChat.bind = this.openChat;
    }

    openChat(name) {
        this.setState({
            activeChat: name
        });
    }

    render() {
        let chatBtns = [];
        let chatIndexes = {};
        let chatMessages = [];
        let groupCnt = 1;
        window.displayData['messages.json'].forEach((item, i) => {
            let chatParties = item.participants.length;
            let itemParticipant =
                item.participants[0] == window.currentUsername
                    ? item.participants[1]
                    : item.participants[0];
            let chatWith =
                chatParties > 2
                    ? 'Group ' +
                      groupCnt++ +
                      '(' +
                      chatParties +
                      ' participants)'
                    : itemParticipant;
            if (Object.keys(chatIndexes).indexOf(chatWith) < 0) {
                chatIndexes[chatWith] = [];

                chatBtns.push(
                    e(
                        'button',
                        {
                            key:
                                'message_index_' +
                                i +
                                '_itemParticipant_' +
                                itemParticipant,
                            onClick: () => {
                                this.openChat(chatWith);
                            },
                            style: {
                                width: '100%'
                            }
                        },
                        chatWith
                    )
                );
            }
            chatIndexes[chatWith].push(i);
        });
        if (this.state.activeChat != null) {
            chatIndexes[this.state.activeChat].forEach((chatIndex, iConvo) => {
                window.displayData['messages.json'][
                    chatIndex
                ].conversation.forEach((msg, iMsg) => {
                    let { sender, created_at, text } = msg;
                    chatMessages.push(
                        e(
                            'div',
                            {
                                className:
                                    'userMessage ' +
                                    (sender == window.currentUsername
                                        ? 'right'
                                        : 'left'),
                                key:
                                    'message_' +
                                    iConvo +
                                    '.' +
                                    iMsg +
                                    '_in_' +
                                    this.state.activeChat,
                                order: new Date(
                                    created_at.substring(0, 10)
                                ).getTime()
                            },
                            e(
                                'div',
                                {},
                                e('p', { className: 'sender' }, sender),
                                e('p', { className: 'text' }, text)
                            )
                        )
                    );
                });
            });
        }
        return [
            e(
                'h1',
                {},
                'Your Messages' +
                    (this.state.activeChat != null
                        ? ' with ' + this.state.activeChat
                        : '')
            ),
            e(
                'div',
                {
                    style: {
                        display: 'flex',
                        flexFlow: 'row nowrap'
                    }
                },
                e(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            width: '50%',
                            maxWidth: '180px',
                            overflowY: 'auto'
                        }
                    },
                    chatBtns
                ),
                e(
                    'div',
                    {
                        style: {
                            display: 'flex',
                            flexFlow: 'column nowrap',
                            overflowY: 'auto',
                            paddingLeft: '12px',
                            paddingBottom: '20px'
                        }
                    },
                    e('div', { id: 'messageChatContainer' }, chatMessages)
                )
            )
        ];
    }
}

class pageSaved extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeCollection: null };
    }
    render() {
        let collectionButtons = [];

        let items = [];
        let activeColName = '',
            activeColCreated = '',
            activeColUpdated = '';

        window.displayData['saved.json'].saved_collections.forEach(
            collection => {
                collectionButtons.push(
                    e(
                        'button',
                        {
                            key: 'select_collection_' + collection.name,
                            onClick: () => {
                                this.setState({
                                    activeCollection: collection.name
                                });
                            }
                        },
                        collection.name
                    )
                );

                // load specific collection if requested earlier
                if (
                    this.state.activeCollection != null &&
                    this.state.activeCollection != 'All posts' &&
                    collection.name == this.state.activeCollection
                ) {
                    collection.media.forEach((item, i) => {
                        items.push(
                            e(
                                'li',
                                {
                                    key:
                                        'col_' +
                                        collection.name +
                                        '_saved_post_' +
                                        i
                                },
                                'Post by ' + item[1],
                                e('br'),
                                item[0]
                            )
                        );
                    });
                    activeColName = collection.name;
                    activeColCreated = collection.created_at;
                    activeColUpdated = collection.updated_at;
                    return true;
                }
            }
        );

        if (this.state.activeCollection == 'All posts') {
            // load all saved items (saved_media)
            console.log('load all saved');
            window.displayData['saved.json'].saved_media.forEach((media, i) => {
                items.push(
                    e(
                        'li',
                        { key: 'all_saved_post_' + i },
                        'Post by ' + media[1],
                        e('br'),
                        media[0]
                    )
                );
            });
        } else if (this.state.activeCollection == null) {
            items.push(
                e(
                    'li',
                    { key: 'emptyCollection' },
                    e('h2', {}, 'Please select a collection')
                )
            );
        }

        return e(
            'div',
            {
                style: {
                    display: 'flex',
                    flexFlow: 'row nowrap'
                }
            },
            e(
                'div',
                { style: { maxWidth: '50%', position: 'sticky', top: 0 } },
                e('h1', {}, 'Your Saved Posts'),
                e(
                    'div',
                    {
                        className: 'savedContainer'
                    },
                    e(
                        'button',
                        {
                            key: 'all_posts',
                            onClick: e => {
                                this.setState({
                                    activeCollection: 'All posts'
                                });
                            }
                        },
                        'All saved posts'
                    ),
                    collectionButtons
                )
            ),
            e(
                'div',
                { style: { marginLeft: '8px' } },
                e(
                    'h1',
                    {},
                    'Selected Collection: ' +
                        this.state.activeCollection +
                        '(' +
                        items.length +
                        ')'
                ),
                e('ul', {}, items)
            )
        );
    }
}

class pageProfile extends React.Component {
    render() {
        let profile = window.displayData['profile.json'];

        let today = new Date();
        let birthDate = new Date(profile['date_of_birth']);
        let age = today.getFullYear() - birthDate.getFullYear();
        let m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        let millisecondsSinceJoin = Math.abs(
            new Date(profile['date_joined']).getTime() - today.getTime()
        );

        return [
            e('h1', {}, 'Your Profile'),
            e(
                'div',
                { style: { display: 'flex', flexFlow: 'row wrap' } },
                e('img', {
                    className: 'profileImage',
                    src: profile['profile_pic_url'],
                    alt:
                        'Profile Image of instagram.com/' + profile['username'],
                    title: 'Profile image',
                    style: { marginRight: '8px' }
                }),
                e(
                    'div',
                    { style: { display: 'flex', flexFlow: 'column nowrap' } },
                    e('p', { title: 'Name' }, profile['name']),
                    e(
                        'p',
                        { title: 'Username' },
                        '@',
                        e(
                            'a',
                            {
                                href:
                                    'https://instagram.com/' +
                                    profile['username']
                            },
                            profile['username']
                        ),
                        ' (' +
                            (profile['private_account'] ? 'is' : 'is not') +
                            ' private)'
                    ),
                    e('p', { title: 'Email' }, profile['email']),
                    e(
                        'p',
                        {},
                        age + 'y/o (Born: ' + profile['date_of_birth'] + ')'
                    ),
                    e(
                        'p',
                        {
                            title: 'Gender',
                            style: { textTransform: 'Capitalize' }
                        },
                        profile['gender']
                    ),
                    e(
                        'p',
                        {},
                        'Instagram user since ' +
                            Math.floor(
                                millisecondsSinceJoin /
                                    (millisecondsSinceJoin < 31555e6
                                        ? 864e5 // 1 day in milliseconds
                                        : 31555e6) // 1 year in milliseconds
                            ) +
                            (millisecondsSinceJoin < 31555e6
                                ? ' day(s)'
                                : ' year(s)') +
                            ' (joined: ' +
                            profile['date_joined'] +
                            ')'
                    )
                )
            )
        ];
    }
}

class pageConnections extends React.Component {
    render() {
        let blocked = [];
        let closeFriends = [];
        let restricted = [];
        let sentFollowRequests = [];
        let followers = [];
        let following = [];
        let followingHashtags = [];

        Object.keys(
            window.displayData['connections.json']['blocked_users']
        ).forEach((user, i) => {
            blocked.push(
                e(
                    'li',
                    { key: 'connections_blocked_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json']['blocked_users'][
                            user
                        ]
                    )
                )
            );
        });

        Object.keys(
            window.displayData['connections.json']['close_friends']
        ).forEach((user, i) => {
            closeFriends.push(
                e(
                    'li',
                    { key: 'connections_close_friend_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json']['close_friends'][
                            user
                        ]
                    )
                )
            );
        });

        Object.keys(
            window.displayData['connections.json']['restricted_users']
        ).forEach((user, i) => {
            restricted.push(
                e(
                    'li',
                    { key: 'connections_restricted_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json'][
                            'restricted_users'
                        ][user]
                    )
                )
            );
        });

        Object.keys(
            window.displayData['connections.json']['follow_requests_sent']
        ).forEach((user, i) => {
            sentFollowRequests.push(
                e(
                    'li',
                    { key: 'connections_sent_follow_request_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json'][
                            'follow_requests_sent'
                        ][user]
                    )
                )
            );
        });

        Object.keys(
            window.displayData['connections.json']['followers']
        ).forEach((user, i) => {
            followers.push(
                e(
                    'li',
                    { key: 'connections_followers_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json']['followers'][
                            user
                        ]
                    )
                )
            );
        });

        Object.keys(
            window.displayData['connections.json']['following']
        ).forEach((user, i) => {
            following.push(
                e(
                    'li',
                    { key: 'connections_following_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json']['following'][
                            user
                        ]
                    )
                )
            );
        });

        Object.keys(
            window.displayData['connections.json']['following_hashtags']
        ).forEach((user, i) => {
            followingHashtags.push(
                e(
                    'li',
                    { key: 'connections_following_hashtags_' + i },
                    e('p', {}, user),
                    e(
                        'p',
                        {},
                        window.displayData['connections.json'][
                            'following_hashtags'
                        ][user]
                    )
                )
            );
        });

        let emptyItem = e('li', {}, 'No users found');

        return [
            e('h1', {}, 'Your Connections'),
            e(
                'div',
                {
                    className: 'pageNav'
                },
                e('a', { href: '#connectionsNavBlocked' }, 'Blocked Users'),
                e('a', { href: '#connectionsNavCloseF' }, 'Close Friends'),
                e(
                    'a',
                    { href: '#connectionsNavRestricted' },
                    'Restricted Users'
                ),
                e(
                    'a',
                    { href: '#connectionsNavSentFR' },
                    'Sent Follow Requests'
                ),
                e('a', { href: '#connectionsNavFollowers' }, 'Followers'),
                e('a', { href: '#connectionsNavFollowing' }, 'Following'),
                e(
                    'a',
                    { href: '#connectionsNavFollowingHT' },
                    'Following Hashtags'
                )
            ),
            e(
                'div',
                {
                    className: 'pageNavedContainer'
                },
                e(
                    'div',
                    { id: 'connectionsNavBlocked' },
                    e('h2', {}, 'Blocked Users (' + blocked.length + ')'),
                    e('ul', {}, blocked.length > 0 ? blocked : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavCloseF' },
                    e('h2', {}, 'Close Friends (' + closeFriends.length + ')'),
                    e(
                        'ul',
                        {},
                        closeFriends.length > 0 ? closeFriends : emptyItem
                    )
                ),
                e(
                    'div',
                    { id: 'connectionsNavRestricted' },
                    e('h2', {}, 'Restricted Users (' + restricted.length + ')'),
                    e('ul', {}, restricted.length > 0 ? restricted : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavSentFR' },
                    e(
                        'h2',
                        {},
                        'Sent Follow Requests (' +
                            sentFollowRequests.length +
                            ')'
                    ),
                    e(
                        'ul',
                        {},
                        sentFollowRequests.length > 0
                            ? sentFollowRequests
                            : emptyItem
                    )
                ),
                e(
                    'div',
                    { id: 'connectionsNavFollowers' },
                    e('h2', {}, 'Followers (' + followers.length + ')'),
                    e('ul', {}, followers.length > 0 ? followers : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavFollowing' },
                    e('h2', {}, 'Following (' + following.length + ')'),
                    e('ul', {}, following.length > 0 ? following : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavFollowingHT' },
                    e(
                        'h2',
                        {},
                        'Following Hashtags (' + followingHashtags.length + ')'
                    ),
                    e(
                        'ul',
                        {},
                        followingHashtags.length > 0
                            ? followingHashtags
                            : emptyItem
                    )
                )
            )
        ];
    }
}

class pageContacts extends React.Component {
    render() {
        let contactItems = [];
        window.displayData['contacts.json'].forEach((contact, i) => {
            contactItems.push(
                e(
                    'li',
                    { key: 'contact_' + i },
                    e(
                        'p',
                        {},
                        contact['last_name'] + ', ' + contact['first_name']
                    ),
                    e('p', {}, contact['contact'])
                )
            );
        });

        return [
            e(
                'h1',
                {},
                'Your contacts (' +
                    window.displayData['contacts.json'].length +
                    ')'
            ),
            e('ul', {}, contactItems)
        ];
    }
}

class pageComments extends React.Component {
    render() {
        let postComments = [];
        // live_comments empty
        window.displayData['comments.json'].media_comments.forEach(
            (comment, i) => {
                postComments.push(
                    e(
                        'li',
                        { key: 'comment_' + i },
                        e('p', { className: 'commentTxt' }, comment[1]),
                        e(
                            'p',
                            {},
                            'Post from: ',
                            e(
                                'a',
                                {
                                    href:
                                        'https://instagram.com/' +
                                        comment[2] +
                                        '/'
                                },
                                comment[2]
                            )
                        ),
                        e('p', {}, 'on ' + comment[0])
                    )
                );
            }
        );

        return e(
            'div',
            { className: 'comments' },
            e('h1', {}, 'Your comments (' + postComments.length + ')'),
            e('ul', {}, postComments)
        );
    }
}
