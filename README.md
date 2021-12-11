# Reward Points
A point tracking API that allows the user to enter, modify and track a user's reward points.

# Prerequisites
- [Node.js](https://nodejs.org/en/)
- Curl or Postman
- Git

# Build Project
 UNIX
 - Clone repo - `git clone https://github.com/markPVale/reward-points`
 - Navigate to the root directory - `cd reward-points`
 - Install dependencies - `npm install`
 - Start server - `node server/index.js`
 - Navigate to http://localhost:3000

# Endpoints
### POST /user/:id
Add a transaction for a specific user

Parameter |   Type   | Description
----------|----------|------------
userId    | integer  | A unique identifier for a user
payer     | integer  | The awarder of the points.
points    | integer  | The number of the points in the transaction.

RESPONSE
> Response: Status 201 CREATED

EXAMPLE USAGE w/Curl
```
curl --location --request POST 'http://localhost:3000/user/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 42,
  "payer": "GM",
  "points": 150
}'
```

EXAMPLE USAGE w/Postman
```
POST http://localhost:3000/user/:id
Body
raw
{
  "userId": 42,
  "payer": "GM",
  "points": 200
}
```

### PUT /spendPoints
Spend points from a users account { "userId": <integer>, "payer": <string>, "points": <integer> } for each call.

Parameter |   Type  | Description
----------|---------|------------
userId    | integer | unique identifier
payer     | string  | the awarder of the points
points    | integer | the number of points spent from the user's account

RESPONSE
> Response: Status 200 OK
```json
[
  {
    "payer": "GM",
    "points": -100
  }
]
```

EXAMPLE USAGE
```
curl --location --request PUT 'http://localhost:3000/spendPoints' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 42,
  "pointsSpent": 100
}'

```
EXAMPLE USAGE w/Postman
```
PUT http://localhost:3000/spendPoints
Body
raw
{
  "userId": 42,
  "pointsSpent": 200
}
```

### GET /getPayerBalances
Retrieve all payer point balances.

RESPONSE
> Response: Status 200 OK
```json
{
  "GM": 50
}
```

EXAMPLE USAGE w/Curl
```
curl --location --request GET 'http://localhost:3000/userPoints' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 42
}'

```

EXAMPLE USAGE w/Postman
```
GET http://localhost:3000/userPoints
```



