## Assignment System Backend

- A backend application that facilitates assignment handling between users and admins. Users can submit assignments, while admins have the authority to accept or reject them.

Feature

- register
- login
- logout
- get Admin
- upload Assignment
- get Assignment
- accept Assignment
- reject Assignment

## Tech Stack

- Express js

### DATA Base

- MongoDB

#### Deployment

- App is deployed to Render.

#### For Local host

we need to below env variable:

    PORT= XXXX
    DATABASE_URL= XXXXXXXX
    CROSS_ORIGIN=*
    ACCESS_TOKEN_SECRET= XXXXXX
    ACCESS_TOKEN_EXPIRY= 1D or 7d

#### ENDPOINT

### base url - /api/v1/user

`/register`

```javascript
  Admin register

 if anyone want to register as normal user

  role:"user"

 method - POST

 request body-
 {
   name: "Saket Kumar",
   email: "kumarsaket601",
   password: "any123"
   role : "admin",
 }

 response body - {

   status code - 200
   message :" User has successfully registered"

 }
```

`/login`

```javascript
Login

method - POST

request body-
{
  email: "kumarsaket601",
  password: "any123"
}

response body - {
    data: {},
    message: "Successfully Logged IN",
    status: 200
}
```

`/logout`

```javascript

 Logout

 method - POST

  response body - {
    data: null,
    message: "SuccessFully Logged out",
    status: 200

  }
```

`/upload`

```javascript

  upload assignment


  method - POST

  request body - {

    task: "a web app for chat to friend"

  }

  response body - {
     "data": {
        userId: "673896a1d4cdfac355dfd970",
        task: "web app for dom",
        admin: "6739d1ba2764ad9894dd5d50",
        status: "pending",
        _id: "6739e8fe6b0a4359bb29ef2a",

    },
    "message": "Successfully Created assignment",
    "status": 200

  }
```

`/admin`

```javascript

 fetch all Admin  list

 method - GET

 response body - {
   data:[ {
     _id: 7,
        name:"Saket kumar",
        email:"kumarsaket601@gmail.com"
   }],
   message :"Admin data fetch successfully",
  status 200

 }
```

## base url - /api/v1/admin

`/assignments`

```javascript

 fetch all assignments  list

 method - GET

 response body - {
   data:[ {
     "data": [
       {
         "_id": "6739f93a0e670a7139a3eff6",
            "userId": {
              "_id": "6739d2260abf77645809db44",
                "name": "nagin kumar",
                "email": "nagin@gmail.com"
            },
            "task": "web app for dom",
            "admin": {
              "_id": "6739d1e71842dd6a716afbf4",
                "name": "Ak kumar",
                "email": "ak@gmail.com"
            },

   }],
     status: "pending",
   message: "Assignment data fetch successfully",
    status- 200
 }]
 }
```

`/assignments/:id/accept`

```javascript

 Accept assignments

 request params - id

  method - POST

 response body - {
     "data": {
        "_id": "6739f93a0e670a7139a3eff6",
        "userId": "6739d2260abf77645809db44",
        "task": "web app for dom",
        "admin": "6739d1e71842dd6a716afbf4",
        "status": "accept",
    }, 
    message: "Assignment  is accepted by Admin ",
    status: 200
 }

```

`/assignments/:id/reject`

```javascript

 Reject assignment

 request params - id

 method - POST

 response body - {
    "data": {
        "_id": "6739f93a0e670a7139a3eff6",
        "userId": "6739d2260abf77645809db44",
        "task": "web app for dom",
        "admin": "6739d1e71842dd6a716afbf4",
        "status": "reject",
    },
    "message": "Assignment is rejected by Admin ",
    "status": 200
 }

```
