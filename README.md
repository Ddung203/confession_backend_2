# Thông tin API

URL local: `http://localhost:3000/api/v1/sign-up`

URL deploy: ``

## Sign up

### Method: POST

#### Request body

```json
{
  "name": "ddung203",
  "image": "photo1.png",
  "deviceId": "1"
}
```

#### Rules

- name ~ username: unique
- deviceId ~ deviceId: unique

#### Response

Thành công

```json
{
  "statusCode": 201,
  "message": "Sign up successful.",
  "data": {
    "image": "anh2"
  }
}
```

Thất bại

```json
{
  "statusCode": 200,
  "message": "The name or device id is exsisted."
}
```

statusCode: 500 - Lỗi phía server

```json
{
  "statusCode": 500,
  "message": "Internal Server Error",
  "data": null
}
```

## Sign in

### Method: POST

#### Request body

```json
{
  "deviceId": "1"
}
```

#### Rules

#### Response

Thành công

```json
{
  "statusCode": 200,
  "message": "Sign in successful.",
  "data": {
    "name": "ddung200",
    "image": "anh2"
  }
}
```

Thất bại

```json
{
  "statusCode": 400,
  "message": "User not found."
}
```
