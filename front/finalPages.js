/*
class pageComments extends React.Component {
    render() {
        let comments = {
            postComments: window.displayData['comments.json'].
        };
        return e(
            'div',
            {},
            e('p', {}, 'Welcome to comments'),
            e('p', {}, 'Comments: idek')
        );
    }
}
*/

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
                        e('p', {}, '"' + comment[1] + '"'),
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
