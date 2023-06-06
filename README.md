## Edit a file

Node JS starter kit for user login & blog crud api using mongodb.

1. npm install
2. npm start
3. Server run on http://localhost:3000 port.

## API List

### Login API

- http://localhost:3000/login
- Request Payload

```
{
  "email" : "admin@admin.com",
  "password" : "admin"
}
```

- Response

```
{
    "data": {
        "name": "Administrator",
        "email": "admin@admin.com",
        "username": "admin",
        "role": "admin",
        "organization": "Pro Code Programming",
        "createdBy": "Pro Code Programming",
        "loggedInAt": "2023-06-06T05:52:29.014Z",
        "token": "eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIMnUwdfob5dVn1m9prlqPqXBggoj4ntYRiPcP"
    },
    "status": 200,
    "message": "Login successfully"
}
```

- Failed Response

```
{
    "status": 400,
    "message": "Invalid credentials found. Please used valid credentials"
}
```

---

### Blogs Fetch API

- http://localhost:3000/blogs
- Response

```
{
    "items": [
        {
            "_id": "647e33d87237b4b3bf5d4b2b",
            "title": "Demo blog",
            "slug": "demo-blog",
            "content": "Demo blog content",
            "is_active": true,
            "createdAt": "2023-06-05T19:13:28.977Z",
            "updatedAt": "2023-06-05T19:40:17.050Z",
            "__v": 0
        },
    ],
    "count": 1
}
```

---

### Blog Fetch Single Detail API

- http://localhost:3000/blogs/blog_slug
- Response

```
{
    "_id": "647eda80642e4e2bd3e51959",
    "title": "Demo Title",
    "slug": "demo-title",
    "content": "Demo content 2",
    "is_active": true,
    "createdAt": "2023-06-06T07:04:32.830Z",
    "updatedAt": "2023-06-06T07:04:32.830Z"
}
```

---

### Blogs Add API

- http://localhost:3000/blogs/add
- Request Payload

```
{
  "title":"Demo Title",
  "content":"Demo content 2"
}
```

- Response

```
{
    "message": "Blog has been created successfully.",
    "data": {
        "title": "Demo Title",
        "slug": "demo-title",
        "content": "Demo content 2",
        "is_active": true,
        "_id": "647eda80642e4e2bd3e51959",
        "createdAt": "2023-06-06T07:04:32.830Z",
        "updatedAt": "2023-06-06T07:04:32.830Z",
        "__v": 0
    }
}
```

---

### Blogs Update API

- http://localhost:3000/blogs/update/:blog_slug
- Request Payload

```
{
  "title":"Demo Title Update",
  "content":"Demo content 2 update"
}
```

- Response

```
{
    "message": "Blog Updated Succefully",
    "data": {
        "title": "Demo Title Update",
        "slug": "demo-title-update",
        "content": "Demo content 2 update",
        "_id": "647eda80642e4e2bd3e51959"
    }
}
```

---

### Blogs Delete API

- http://localhost:3000/blogs/delete/:blog_slug

- Response

```
{
  "message":"Blog deleted succefully",
  "slug":"psdafo-paosfdpaos-d"
}
```
