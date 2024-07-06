### API Documentation

#### Base URL
```
http://localhost:8000
```

### Endpoints

#### 1. User Registration

**Endpoint:** `/auth/register`

**Method:** `POST`

**Description:** Registers a new user.

**Request Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
}
```

**Response:**
```json
{
    "message": "User registered successfully"
}
```

**Errors:**
- `400 Bad Request` - Username or email already exists.

#### 2. User Login

**Endpoint:** `/auth/token`

**Method:** `POST`

**Description:** Authenticates a user and returns a JWT token.

**Request Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
    "username": "testuser",
    "password": "password123"
}
```

**Response:**
```json
{
    "access_token": "jwt_token_here"
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials.

#### 3. Create a Journal Entry

**Endpoint:** `/journal`

**Method:** `POST`

**Description:** Creates a new journal entry.

**Request Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
    "title": "My First Entry",
    "content": "This is the content of my first entry.",
    "category": "Personal",
    "date": "2024-07-06"
}
```

**Response:**
```json
{
    "message": "Journal entry created successfully"
}
```

#### 4. Get Journal Entries

**Endpoint:** `/journal`

**Method:** `GET`

**Description:** Retrieves all journal entries for the authenticated user.

**Request Headers:**
- `Authorization: Bearer <access_token>`

**Response:**
```json
{
    "entries": [
        {
            "id": 1,
            "title": "My First Entry",
            "content": "This is the content of my first entry.",
            "category": "Personal",
            "date": "2024-07-06"
        },
        ...
    ]
}
```

#### 5. Update a Journal Entry

**Endpoint:** `/journal/:id`

**Method:** `PUT`

**Description:** Updates an existing journal entry.

**Request Headers:**
- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

**Request Body:**
```json
{
    "title": "Updated Entry",
    "content": "This is the updated content.",
    "category": "Work"
}
```

**Response:**
```json
{
    "message": "Journal entry updated successfully"
}
```

#### 6. Delete a Journal Entry

**Endpoint:** `/journal/:id`

**Method:** `DELETE`

**Description:** Deletes a journal entry.

**Request Headers:**
- `Authorization: Bearer <access_token>`

**Response:**
```json
{
    "message": "Journal entry deleted successfully"
}
```

#### 7. Get Data Summary

**Endpoint:** `/summary/:period`

**Method:** `GET`

**Description:** Retrieves a summary of journal entries for a given period (daily, weekly, monthly).

**Request Headers:**
- `Authorization: Bearer <access_token>`

**Response:**
```json
{
    "summary": [
        {
            "category": "Personal",
            "count": 5
        },
        ...
    ]
}
```

**Periods:**
- `daily` - Summary of entries from the last 24 hours.
- `weekly` - Summary of entries from the last 7 days.
- `monthly` - Summary of entries from the last 30 days.

### Example Requests in Postman

1. **User Registration:**
   - Method: `POST`
   - URL: `{{base_url}}/auth/register`
   - Headers: `Content-Type: application/json`
   - Body: 
     ```json
     {
         "username": "testuser",
         "email": "testuser@example.com",
         "password": "password123"
     }
     ```

2. **User Login:**
   - Method: `POST`
   - URL: `{{base_url}}/auth/token`
   - Headers: `Content-Type: application/json`
   - Body: 
     ```json
     {
         "username": "testuser",
         "password": "password123"
     }
     ```

3. **Create a Journal Entry:**
   - Method: `POST`
   - URL: `{{base_url}}/journal`
   - Headers: 
     - `Content-Type: application/json`
     - `Authorization: Bearer <access_token>`
   - Body:
     ```json
     {
         "title": "My First Entry",
         "content": "This is the content of my first entry.",
         "category": "Personal",
         "date": "2024-07-06"
     }
     ```

4. **Get Journal Entries:**
   - Method: `GET`
   - URL: `{{base_url}}/journal`
   - Headers: 
     - `Authorization: Bearer <access_token>`

5. **Update a Journal Entry:**
   - Method: `PUT`
   - URL: `{{base_url}}/journal/1`
   - Headers: 
     - `Content-Type: application/json`
     - `Authorization: Bearer <access_token>`
   - Body:
     ```json
     {
         "title": "Updated Entry",
         "content": "This is the updated content.",
         "category": "Work"
     }
     ```

6. **Delete a Journal Entry:**
   - Method: `DELETE`
   - URL: `{{base_url}}/journal/1`
   - Headers: 
     - `Authorization: Bearer <access_token>`

7. **Get Data Summary:**
   - Method: `GET`
   - URL: `{{base_url}}/summary/daily`
   - Headers: 
     - `Authorization: Bearer <access_token>`

This documentation provides a detailed guide on how to interact with the backend API endpoints using Postman or any other HTTP client.