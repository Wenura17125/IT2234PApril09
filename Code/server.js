const express = require('express');
const users = require('./users');
const posts = require('./posts');
const comments = require('./comments');

const app = express();
const port = 3000;

// User summary endpoint
app.get('/api/users/:id/summary', (req, res) => {
    const userId = req.params.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    const userPosts = posts.filter(post => post.authorId === userId);
    const userComments = comments.filter(comment => comment.userId === userId);

    const summary = {
        user: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            email: user.email
        },
        stats: {
            totalPosts: userPosts.length,
            totalComments: userComments.length
        }
    };

    res.json(summary);
});

// Post comments endpoint
app.get('/api/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const postComments = comments.filter(comment => comment.postId === postId);

    if (postComments.length === 0) {
        return res.status(404).json({ error: 'Post not found or no comments available' });
    }

    const formattedComments = {
        comments: postComments.map(comment => {
            const commentator = users.find(user => user.id === comment.userId);
            return {
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                commentator: {
                    username: commentator.username,
                    fullName: commentator.fullName
                }
            };
        })
    };

    res.json(formattedComments);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});