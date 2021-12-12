curl --location --request POST 'http://localhost:3000/user/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 5,
  "payer": "dannon",
  "points": 300
}

'
curl --location --request POST 'http://localhost:3000/user/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 5,
  "payer": "dannon",
  "points": -200
}

'
curl --location --request POST 'http://localhost:3000/user/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 5,
  "payer": "Unilever",
  "points": 200
}

'

curl --location --request POST 'http://localhost:3000/user/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 5,
  "payer": "Miller coors",
  "points": 10000
}

'

curl --location --request POST 'http://localhost:3000/user/:id' \
--header 'Content-Type: application/json' \
--data-raw '{
  "userId": 5,
  "payer": "Dannon",
  "points": 1000
}

'