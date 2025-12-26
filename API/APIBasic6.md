Day 6: Consuming REST APIs in Code (Making Actual HTTP Requests Programmatically)

Now that you understand REST principles, HTTP methods, and have tested APIs manually (e.g., with Postman or curl), it's time to write real code to interact with APIs. This is where things start feeling like actual development.

What to Learn Today:How to Make HTTP Requests in CodeFocus on one language to start (I recommend Node.js or Python – both are beginner-friendly and widely used for backend).
Learn the most common library for HTTP requests in that language.

Handling ResponsesParsing JSON responses
Checking status codes
Handling errors (e.g., 404, 500, network issues)

Sending DataQuery parameters, path parameters
Request body (JSON for POST/PUT/PATCH)
Headers (e.g., Authorization, Content-Type)

Choose Your Language Track (Pick One for Now):Option 1: Node.js (JavaScript/TypeScript) – Great if you're into full-stack JS

Use built-in fetch (modern Node.js supports it) or the popular axios library.

Hands-On Tasks for Today (Do These!):

Set up your environment:Node.js: Install from nodejs.org, use node yourfile.js
Python: Install Python, use a file or Jupyter/repl.it

Write code to:Fetch and print all posts from JSONPlaceholder
Fetch a single post by ID (use path param: /posts/1)
Create a new post (POST) and print the response
Update a post (try PUT or PATCH)
Delete a post (DELETE) and check status

Bonus Challenges:Add error handling (e.g., check if response.ok or response.status_code)
Filter posts by userId using query params: /posts?userId=1
Try another public API (e.g., https://reqres.in/api/users)

This day bridges theory to real coding.

Once you're comfortable making requests, you'll be ready to build your own APIs soon.

