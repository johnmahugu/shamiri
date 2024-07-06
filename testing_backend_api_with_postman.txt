##Testing endpoints using Postman, follow these steps:

### 1. Install and Open Postman

- If you don't have Postman installed, download and install it from [Postman's website](https://www.postman.com/downloads/).

### 2. Set Up Postman Environment

- Open Postman.
- Click on the "Environment" dropdown in the top-right corner.
- Click "Manage Environments" and create a new environment.
- Add a variable named `base_url` and set its value to `http://localhost:8000`.
- Save the environment.

### 3. Test the Endpoints

#### User Registration

**Endpoint:** `/auth/register`

**Method:** `POST`

**URL:** `{{base_url}}/auth/register`

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
}
```

**Steps:**

- Select `POST` method.
- Set the URL to `{{base_url}}/auth/register`.
- Go to the `Headers` tab and add the `Content-Type: application/json` header.
- Go to the `Body` tab, select `raw` and set the type to `JSON`.
- Enter the JSON payload as shown above.
- Click `Send`.

#### User Login

**Endpoint:** `/auth/token`

**Method:** `POST`

**URL:** `{{base_url}}/auth/token`

**Headers:**

- `Content-Type: application/json`

**Body:**

```json
{
    "username": "testuser",
    "password": "password123"
}
```

**Steps:**

- Select `POST` method.
- Set the URL to `{{base_url}}/auth/token`.
- Go to the `Headers` tab and add the `Content-Type: application/json` header.
- Go to the `Body` tab, select `raw` and set the type to `JSON`.
- Enter the JSON payload as shown above.
- Click `Send`.
- Copy the `access_token` from the response for future requests.

#### Create a Journal Entry

**Endpoint:** `/journal`

**Method:** `POST`

**URL:** `{{base_url}}/journal`

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

**Body:**

```json
{
    "title": "My First Entry",
    "content": "This is the content of my first entry.",
    "category": "Personal",
    "date": "2024-07-06"
}
```

**Steps:**

- Select `POST` method.
- Set the URL to `{{base_url}}/journal`.
- Go to the `Headers` tab and add `Content-Type: application/json`.
- Add the `Authorization` header and set its value to `Bearer <access_token>` (replace `<access_token>` with the token obtained from the login request).
- Go to the `Body` tab, select `raw` and set the type to `JSON`.
- Enter the JSON payload as shown above.
- Click `Send`.

#### Get Journal Entries

**Endpoint:** `/journal`

**Method:** `GET`

**URL:** `{{base_url}}/journal`

**Headers:**

- `Authorization: Bearer <access_token>`

**Steps:**

- Select `GET` method.
- Set the URL to `{{base_url}}/journal`.
- Go to the `Headers` tab and add the `Authorization` header and set its value to `Bearer <access_token>`.
- Click `Send`.

#### Update a Journal Entry

**Endpoint:** `/journal/:id`

**Method:** `PUT`

**URL:** `{{base_url}}/journal/1`

**Headers:**

- `Content-Type: application/json`
- `Authorization: Bearer <access_token>`

**Body:**

```json
{
    "title": "Updated Entry",
    "content": "This is the updated content.",
    "category": "Work"
}
```

**Steps:**

- Select `PUT` method.
- Set the URL to `{{base_url}}/journal/1` (replace `1` with the actual entry ID).
- Go to the `Headers` tab and add `Content-Type: application/json`.
- Add the `Authorization` header and set its value to `Bearer <access_token>`.
- Go to the `Body` tab, select `raw` and set the type to `JSON`.
- Enter the JSON payload as shown above.
- Click `Send`.

#### Delete a Journal Entry

**Endpoint:** `/journal/:id`

**Method:** `DELETE`

**URL:** `{{base_url}}/journal/1`

**Headers:**

- `Authorization: Bearer <access_token>`

**Steps:**

- Select `DELETE` method.
- Set the URL to `{{base_url}}/journal/1` (replace `1` with the actual entry ID).
- Go to the `Headers` tab and add the `Authorization` header and set its value to `Bearer <access_token>`.
- Click `Send`.

#### Get Data Summary

**Endpoint:** `/summary/:period`

**Method:** `GET`

**URL:** `{{base_url}}/summary/daily`

**Headers:**

- `Authorization: Bearer <access_token>`

**Steps:**

- Select `GET` method.
- Set the URL to `{{base_url}}/summary/daily` (replace `daily` with `weekly` or `monthly` as needed).
- Go to the `Headers` tab and add the `Authorization` header and set its value to `Bearer <access_token>`.
- Click `Send`.

By following these steps, you can test all the endpoints of your Node.js backend API using Postman. If you have any issues or need further assistance, contact johnmahugu@gmail.com for shamiri health.