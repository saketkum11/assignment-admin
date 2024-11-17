## Assignment System Backend

- A Backend  app  which handle assignment assign.
- User can upload the assignment to admin , and admin can Accept or Reject them .

#### ENDPOINT

base url - /api/v1/user

`/register`

```javascript
  Admin register

 if anyone want to register as normal user

  role:"user"

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

request body-
{
  email: "kumarsaket601",
  password: "any123"
}

response body - {
  status code - 200
  message :"Successfully Logged IN"

}
```

`/logout`

```javascript
  Logout

  response body - {
    status code - 200
    message :"SuccessFully Logged out"

  }
```

`/upload`

```javascript

  upload assignment



  request body - {

    task: "a web app for chat to friend"

  }

  response body - {
    status code - 200
    data: {
        userId: 9,
        task:"a web app for chat to friend",
        admin: 5
    }
    message :"Successfully Created assignment"

  }
```

`/admin`

```javascript

 fetch all Admin  list


 response body - {
   status code - 200
   data: {
        _id: 7,
        name:"Saket kumar",
        email:"kumarsaket601@gmail.com"
   }
   message :"Admin data fetch successfully"

 }
```

#### base url - /api/v1/admin

`/assignments`

```javascript

 fetch all Admin  list


 response body - {
   status code - 200
   data:[ {
        _id: 7,
        userId: 6,
        task : "a web app for  chat with friend"
        adminId: 9
   }],
   message: "Assignment data fetch successfully",

 }
```

`/assignments/:id/accept`

```javascript

 fetch all Admin  list

 request params - id

 response body - {
    status code - 200,
    message: "Assignment  is accepted by Admin"
 }

```

`/assignments/:id/reject`

```javascript

 fetch all Admin  list

 request params - id

 response body - {
    status code - 200,
    message: "Assignment  is rejectd by Admin"
 }

```
