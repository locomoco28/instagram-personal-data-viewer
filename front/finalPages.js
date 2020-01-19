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

        return e(
            'div',
            {},
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
        );
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

        return e(
            'div',
            {},
            e('h1', {}, 'Your Connections'),
            e(
                'div',
                {
                    className: 'contactsNav'
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
                    className: 'contactsContainer'
                },
                e(
                    'div',
                    { id: 'connectionsNavBlocked' },
                    e('h2', {}, 'Blocked Users'),
                    e('ul', {}, blocked.length > 0 ? blocked : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavCloseF' },
                    e('h2', {}, 'Close Friends'),
                    e(
                        'ul',
                        {},
                        closeFriends.length > 0 ? closeFriends : emptyItem
                    )
                ),
                e(
                    'div',
                    { id: 'connectionsNavRestricted' },
                    e('h2', {}, 'Restricted Users'),
                    e('ul', {}, restricted.length > 0 ? restricted : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavSentFR' },
                    e('h2', {}, 'Sent Follow Requests'),
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
                    e('h2', {}, 'Followers'),
                    e('ul', {}, followers.length > 0 ? followers : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavFollowing' },
                    e('h2', {}, 'Following'),
                    e('ul', {}, following.length > 0 ? following : emptyItem)
                ),
                e(
                    'div',
                    { id: 'connectionsNavFollowingHT' },
                    e('h2', {}, 'Following Hashtags'),
                    e(
                        'ul',
                        {},
                        followingHashtags.length > 0
                            ? followingHashtags
                            : emptyItem
                    )
                )
            )
        );
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

        return e(
            'div',
            {},
            e('h1', {}, 'Your contacts'),
            e('ul', {}, contactItems)
        );
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
            e('h1', {}, 'Your comments'),
            e('ul', {}, postComments)
        );
    }
}
