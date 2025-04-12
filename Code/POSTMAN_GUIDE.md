# Postman Guide for Blog API Testing

This guide covers how to test the main API endpoints of the blogging platform using Postman.

## Environment Setup

1. Create a new environment in Postman
2. Add a variable `baseUrl` with value `http://localhost:3000`

## Test Scenarios

### 1. User Summary Endpoint

**Request Details:**
- Method: GET
- URL: {{baseUrl}}/api/users/{{userId}}/summary
- Parameters: None

**Example Request:**
```
GET http://localhost:3000/api/users/2/summary
```

**Expected Success Response (200 OK):**
```json
{
  "user": {
    "id": "2",
    "username": "alice_smith",
    "fullName": "Alice Smith",
    "email": "alice@example.com"
  },
  "stats": {
    "totalPosts": 2,
    "totalComments": 2
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

### 2. Post Comments Endpoint

**Request Details:**
- Method: GET
- URL: {{baseUrl}}/api/posts/{{postId}}/comments
- Parameters: None

**Example Request:**
```
GET http://localhost:3000/api/posts/1/comments
```

**Expected Success Response (200 OK):**
```json
{
  "comments": [
    {
      "id": 1,
      "content": "Great tips! I will definitely try these out.",
      "createdAt": "2022-04-10",
      "commentator": {
        "username": "alice_smith",
        "fullName": "Alice Smith"
      }
    },
    {
      "id": 2,
      "content": "Thanks for sharing. It's important to prioritize health.",
      "createdAt": "2022-04-11",
      "commentator": {
        "username": "bob_jackson",
        "fullName": "Bob Jackson"
      }
    }
  ]
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Post not found"
}
```

### 3. Testing Error Handling

#### Invalid User ID
**Request:**
```
GET http://localhost:3000/api/users/999/summary
```

**Expected Response (404 Not Found):**
```json
{
  "error": "User not found"
}
```

#### Invalid Post ID
**Request:**
```
GET http://localhost:3000/api/posts/999/comments
```

**Expected Response (404 Not Found):**
```json
{
  "error": "Post not found"
}
```

## Testing Tips

1. Use environment variables to easily switch between development and production environments
2. Create a collection for all related API tests
3. Use the Tests tab in Postman to write assertions for:
   - Status codes
   - Response structure
   - Data types
   - Required fields

## Common HTTP Status Codes

- 200: Successful request
- 404: Resource not found
- 400: Bad request (invalid parameters)
- 500: Server error

## Best Practices

1. Always check response headers
2. Verify error messages are descriptive
3. Test with both valid and invalid data
4. Test edge cases (empty values, special characters)
5. Validate response times are reasonable