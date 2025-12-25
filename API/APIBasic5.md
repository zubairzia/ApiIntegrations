RESTful Principles and HTTP Methods (CRUD Operations)
REST (Representational State Transfer) is the most common architectural style for building APIs. It uses standard HTTP protocols in a predictable way to interact with resources (like data entities: users, posts, products).
Core REST Principles (focus on these today):Resources: Everything is a "resource" identified by a unique URL (URI). Use nouns, not verbs (e.g., /users instead of /getUsers).
Stateless: Each request contains all info needed; the server doesn't remember previous requests.
Client-Server Separation: Client handles UI, server handles data/logic.
Cacheable: Responses can be cached for performance.
Uniform Interface: Consistent way to interact (via HTTP methods).

HTTP Methods for CRUD (Create, Read, Update, Delete):GET: Retrieve data (safe, idempotent – no side effects). E.g., GET /users (list all) or GET /users/123 (one user).
POST: Create new resource. E.g., POST /users with data in body.
PUT or PATCH: Update resource (PUT replaces entire resource; PATCH updates partially).
DELETE: Remove resource. E.g., DELETE /users/123.
Key concepts: Idempotent methods (GET, PUT, DELETE can be repeated without changing result); POST is not.

Common Response Formats:Most REST APIs use JSON for request/response bodies.
Example response: { "id": 123, "name": "John" }


Status Codes in Context (build on Day 3):200 OK (GET success), 201 Created (POST success), 204 No Content (DELETE success), 404 Not Found, 400 Bad Request, etc.

What to Do (Hands-On Practice – Crucial for Backend Learning):Use a Tool to Test Public APIs:Install Postman (free) or use curl in terminal.
Try a free public REST API like:JSONPlaceholder (fake data): https://jsonplaceholder.typicode.com/GET https://jsonplaceholder.typicode.com/posts (list posts)
GET https://jsonplaceholder.typicode.com/posts/1
POST https://jsonplaceholder.typicode.com/posts (send JSON body: { "title": "My Post", "body": "Hello" })
PUT/PATCH and DELETE on /posts/1

Reqres.in: https://reqres.in/ (includes auth examples)

Experiment with all methods, headers (e.g., Content-Type: application/json), and query params (e.g., GET /posts?userId=1).

