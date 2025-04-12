# IT2234P Web Services and Server Technologies

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)

> 📚 A comprehensive collection of daily practical lessons for Web Services and Server Technologies course.

## 📋 Course Overview

This repository serves as a practical guide through various web services and server technologies. Each lesson is organized in dedicated folders containing both source code and visual outputs.

## 🗓️ Latest Session: RESTful Blog API Implementation (April 9, 2025)

### 🎯 Learning Objectives

- Implement RESTful API endpoints using Express.js
- Design efficient data structures for blog content
- Handle API responses and error cases
- Create user summary endpoints
- Manage post comments and relationships
- Implement proper HTTP status codes
- Structure API responses for optimal client usage

### 💻 Code Examples & Implementations

#### 1. Server Configuration

##### Express Server Setup (`server.js`)
```javascript
const express = require('express');
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
```

#### 2. Data Models

##### User Model (`users.js`)
```javascript
let users = [
    { id: '1', username: 'john_doe', email: 'john@example.com', fullName: 'John Doe' },
    { id: '2', username: 'alice_smith', email: 'alice@example.com', fullName: 'Alice Smith' }
];
```

##### Blog Post Model (`posts.js`)
```javascript
const blogPosts = [
    { 
      id: '1', 
      title: '10 Tips for Healthy Eating',
      content: 'Eating healthy is essential...',
      authorId: '1',
      createdAt: '2022-04-10'
    }
];
```

##### Comments Model (`comments.js`)
```javascript
const comments = [
    { 
      id: 1,
      postId: '1',
      userId: '2',
      content: 'Great tips! I will definitely try these out.',
      createdAt: '2022-04-10'
    }
];
```

#### 3. API Endpoints

##### User Summary Endpoint
```javascript
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
```
[View Output](Output/User%20Summary%20Endpoint.png)

##### Post Comments Endpoint
```javascript
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
```
[View Output](Output/Post%20Comments%20Endpoint.png)

### 📊 Implementation Summary

| Category | File | Description | Output |
|----------|------|-------------|--------|
| Server Configuration | `server.js` | Express server setup and routing | - |
| Data Models | `users.js` | User data structure and management | - |
| Data Models | `posts.js` | Blog post data structure | - |
| Data Models | `comments.js` | Comment data structure | - |
| API Endpoints | `server.js` | User summary endpoint | [View](Output/User%20Summary%20Endpoint.png) |
| API Endpoints | `server.js` | Post comments endpoint | [View](Output/Post%20Comments%20Endpoint.png) |
| Error Handling | `server.js` | API error responses | [View](Output/Testing%20Error%20Handling.png) |

### 🔍 Technical Notes

- Built with Express.js framework
- RESTful API design principles
- Proper error handling and status codes
- Structured response formatting
- Relationship handling between entities
- Clean code practices and modularity

---

<div align="center">

📖 **API Documentation** | 🛠️ **Implementation Examples** | 📊 **Response Samples**

</div>