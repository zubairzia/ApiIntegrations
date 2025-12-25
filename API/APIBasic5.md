RESTful Principles and HTTP Methods (CRUD Operations)
REST (Representational State Transfer) is the most common architectural style for building APIs. It uses standard HTTP protocols in a predictable way to interact with resources (like data entities: users, posts, products).
Core REST Principles (focus on these today):Resources: Everything is a "resource" identified by a unique URL (URI). Use nouns, not verbs (e.g., /users instead of /getUsers).
Stateless: Each request contains all info needed; the server doesn't remember previous requests.
Client-Server Separation: Client handles UI, server handles data/logic.
Cacheable: Responses can be cached for performance.
Uniform Interface: Consistent way to interact (via HTTP methods).
