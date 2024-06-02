````markdown
# Money Lending Application

This is a Node.js application for managing a money lending business. It provides API endpoints for creating and managing users.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/jayvanandel07/Finance-Management-backend
```
````

2. Install dependencies:

```bash
cd Finance-Management-backend
npm install
```

3. Set up environment variables:

Create a `.env` file in the root directory and configure the following environment variables:

```plaintext
PORT=3000
DB_HOST=localhost
DB_USER=username
DB_PASSWORD=password
DB_NAME=my_database
```

Replace `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and `DB_NAME` with your MySQL database credentials.

## File Structure

```
money-lending-app/
│
├── config/
│   └── db.js          # Database configuration
│
├── middlewares/
│   ├── validator.js   # Input validation middleware
│   └── logger.js      # Logging middleware (using morgan)
│
├── routes/
│   └── userRoutes.js  # User routes
│
├── services/
│   └── userService.js # User service
│
├── .env               # Environment variables
├── app.js             # Main application file
└── package.json       # Project dependencies and scripts
```

## Usage

1. Start the application:

```bash
npm start
```

2. Access the API endpoints:

The API will be available at `http://localhost:3000/api/v1`.

## API Endpoints

- `POST /api/v1/users`: Create a new user
- Other endpoints...

## Dependencies

- express: Fast, unopinionated, minimalist web framework for Node.js
- mysql2: MySQL client for Node.js with promises support
- express-validator: Easy input validation middleware for Express.js
- helmet: Secure Express.js apps with various HTTP headers
- morgan: HTTP request logger middleware for Node.js

## API Endpoints

### Base URL

`/api/v1`

### User Types

- Router endpoint `/userTypes`

#### Create user type

- endpoint `POST /`

##### request

- input

```js
{
  type_name: string; // has to unique
}
```

##### response

```js
// if user type already exist
//  status code:409
  {
	"error": "User Type already Exists"
  }

// user created
//  status code:201
  {
	"id": 2,
	"type_name": "borrower"
}
```

#### get all user type

- endpoint `get /`

##### request

- input

```js
{
}
```

##### response

```js
// if user no type exists
//  status code:200
  []

// user type exist
//  status code:200
// returns array of object of user types
	{
		"user_type_id": 1,
		"type_name": "lender"
	},
	{
		"user_type_id": 2,
		"type_name": "borrower"
	}
```

#### get user type by name

- endpoint `get /:type_name`

##### request

param type_name
`/api/v1/userTypes/lender`

##### response

```js
// if no user type exists
//  status code:200
  []

// user type exist
//  status code:200
// returns array of object of user types
	{
		"user_type_id": 1,
		"type_name": "lender"
	}
```

#### update user type

- endpoint `PUT /`

##### request

```js
{
	"type_name": "borroer",
	"updated_type_name":"Borrower"
}
```

##### response

```js
// if user no type exists
//  status code:404
  {
	"error": "User Type does not Exist"
  }

// user type updated
//  status code:200
{
	"user_type_id": 2,
	"type_name": "Borrower"
}
```

#### delete user type

- endpoint `DELETE /`

##### request

```js
{
	"type_name": "borrower"
}
```

##### response

```js
// if user no type exists
//  status code:404
  {
	"error": "User Type does not Exist"
  }

// user type updated
//  status code:200
{
	"message": "user type successfully deleted!",
	"user_type_deleted": {
		"user_type_id": 4,
		"type_name": "borrower"
	}
}
```

### Users

- Router endpoint `/users`

#### get all users

- endpoint `GET /`

##### request

no body

##### response

```
[
	{
		"user_id": 765948,
		"name": "John Doe",
		"tamil_name": "",
		"alias": "",
		"email": null,
		"phone": null,
		"address": null,
		"cibil": null,
		"user_type": 1,
		"created_at": "2024-06-02T11:54:24.000Z",
		"updated_at": "2024-06-02T11:54:24.000Z"
	},
	{
		"user_id": 1234567101112130,
		"name": "John Doe",
		"tamil_name": "",
		"alias": "",
		"email": null,
		"phone": null,
		"address": null,
		"cibil": null,
		"user_type": 1,
		"created_at": "2024-06-01T17:26:47.000Z",
		"updated_at": "2024-06-01T17:26:47.000Z"
	},
	{
		"user_id": 12345678910111322,
		"name": "John Doe",
		"tamil_name": "",
		"alias": "",
		"email": "john.doe@example.com",
		"phone": null,
		"address": null,
		"cibil": null,
		"user_type": 1,
		"created_at": "2024-05-31T19:19:45.000Z",
		"updated_at": "2024-05-31T19:19:45.000Z"
	},

]
```

#### get users by id Or name

- endpoint `GET /:user`

##### request

`/594`

##### response

```
[
	{
		"user_id": 765948,
		"name": "John Doe",
		"tamil_name": "",
		"alias": "",
		"email": null,
		"phone": null,
		"address": null,
		"cibil": null,
		"user_type": 1,
		"created_at": "2024-06-02T11:54:24.000Z",
		"updated_at": "2024-06-02T11:54:24.000Z"
	}
]
```

#### Create user

- endpoint `POST /`

##### request

- input

```js
{
    user_id: Number, // required
    name: String, // required
    tamil_name: String,
    alias: String,
    email: String, // has to be valid email
    phone: String,
    address: String,
    cibil: Number,
    user_type: Number // required , User Type Id
}
```

##### response

```
// if user already exist
//  status code:409
  {
  error: "user already exists"
  }

// user created
//  status code:201
  {
  user_id: 12323,
  name: test,
  tamil_name: test,
  alias: test,
  email: test@a.com,
  phone: 234234,
  address: 234/234 sdf,
  cibil: 12,
  user_type: 1
  }
```

#### Update user

- endpoint `PUT /:user_id`

##### request

`PUT /7659480`

- input

```js
{
	"user_id":765948,
	"name": "jayvan",
	"tamil_name": null,
	"alias": null,
	"user_type": 5
}
```

##### response

```
// if user already exist
//  status code:409
  {
	"error": "user id already exists!"
}

// user updated
//  status code:200
  {
	"message": "User Updated!",
	"user": {
		"user_id": 7659480,
		"name": "jayvan",
		"tamil_name": "",
		"alias": "",
		"email": "",
		"phone": "",
		"address": "",
		"cibil": "",
		"user_type": 5,
		"updated_user_id": "7659480"
	}
}
```

#### delete user

- endpoint `DELETE /:user_id`

##### request

`DELETE /7659480`

##### response

```
// if user does not exist
//  status code:404
  {
	"error": "User does not Exist"
}

// user deleted
//  status code:200
  {
	"message": "user successfully deleted!",
	"user_deleted": [
		{
			"user_id": 7659480,
			"name": "John Doe",
			"tamil_name": "",
			"alias": "",
			"email": "",
			"phone": "",
			"address": "",
			"cibil": "",
			"user_type": 1,
			"created_at": "2024-06-02T14:29:18.000Z",
			"updated_at": "2024-06-02T14:29:18.000Z"
		}
	]
}
```

## Note

- This application uses `pool.getConnection()` for managing database connections with a connection pool. For simple queries, you can also use `db.query()` directly. Choose the appropriate method based on your specific use case and performance requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

```
