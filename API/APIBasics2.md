## 1️⃣ API vs Function vs Library

### 🔹 Function

A function is **internal logic**.

**Example (Deluge):**

```deluge
calculateTotal(price, quantity)
```

✔ Runs inside Zoho
❌ Cannot be called from outside directly

---

### 🔹 Library

A collection of reusable functions.

**Example:**
Zoho Deluge built-in functions:

```deluge
zoho.crm.getRecordById()
```

✔ Pre-written logic
✔ Saves time
❌ Still not communication by itself

---

### 🔹 API (Application Programming Interface)

An API is a **communication contract between two systems**.

**Example:**
Zoho Creator → Zoho CRM
Creator does **NOT** know CRM’s internal code — it only knows:

* URL
* Method
* Headers
* Body
* Response format

✅ APIs enable **cross-product & third-party communication**

---

## 2️⃣ Client–Server Model (Very Important)

In Zoho integrations:

| Role       | Example      |
| ---------- | ------------ |
| **Client** | Zoho Creator |
| **Server** | Zoho CRM     |
| **API**    | CRM REST API |

📌 **Rule:**
The client **requests**, the server **responds** — never the other way around.

---

## 3️⃣ Request–Response Lifecycle (Real Flow)

Let’s break it into **real Zoho terms**:

```
Zoho Creator (Client)
   ↓
API Request
   ↓
Zoho CRM (Server)
   ↓
API Response
   ↓
Zoho Creator processes response
```

### 🧾 Request Contains:

* **Endpoint URL**
* **HTTP Method** (GET, POST, PUT, DELETE)
* **Headers** (Authorization, Content-Type)
* **Body** (data — JSON)

### 📦 Response Contains:

* **Status Code** (200, 201, 401, 404, etc.)
* **Response Body** (JSON)
* **Error message (if any)**

---

## 4️⃣ Stateless Communication (Critical Concept)

**Stateless = each request is independent**

Zoho CRM does **NOT remember**:

* Who you are
* What you requested before

That’s why:

* Every request needs an **access token**
* Every request is **complete by itself**

📌 This explains:

* OAuth tokens
* Expiry
* Refresh tokens

(We’ll master this later.)

---

## 5️⃣ How Zoho Creator Talks to Zoho CRM


> Zoho Creator communicates with Zoho CRM using REST APIs.
> Creator acts as the client and sends an HTTP request to Zoho CRM’s API endpoint.
> The request includes an access token for authentication, an HTTP method (GET/POST/PUT/DELETE), and data in JSON format.
> Zoho CRM processes the request, performs the required action (such as creating or fetching a record), and returns a JSON response with a status code.
> Zoho Creator then reads the response and continues the workflow.

📌 If you can explain this **without memorizing**, you’re on track.

---

## 6️⃣ Mental Model (Remember This Always)

> **API = Waiter**

* You (Client) place an order
* You don’t go into the kitchen
* The kitchen (Server) follows rules
* The waiter brings back the result

Zoho Creator never touches Zoho CRM’s database directly — **only through APIs**.

---

✔ You understand **what an API really is**
✔ You know **client vs server**
✔ You understand **request → response**
✔ You can explain **stateless communication**
✔ You can explain **Creator ↔ CRM interaction**
