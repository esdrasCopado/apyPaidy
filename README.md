![Logo](https://proyectointegradoritson.netlify.app/img/paidy-logo2.svg)

# API Paidy

This API serves the Paidy frontend to users.
API Paidy is part of the final project of "proyecto integrador" for the Software Engineering major at ITSON.


## API Reference

#### Routes of product

http
  GET /v1/routes/productRoutes
  GET /v1/routes/productRoutes/:productName
  POST /v1/routes/productRoutes
  PATCH /v1/routes/productRoutes/:productID
  DELETE /v1/routes/productRoutes/:productID


| Parameter  | Type     | Description                |
| :--------  | :------- | :------------------------- |
| `none`     | `none`    | Retrieves all products |
| `proName`  | `string`  | Retrieves a product by name |
| `none`     | `none`    | Creates a new product |
| `productID`| `number`  | Updates a product by ID |
| `productID`| `number`  | Deletes a product by ID |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AWS_BUCKET_NAME`

`AWS_BUCKET_REGION`

`AWS_PUBLIC_KEY`

`AWS_SECRET_KEY`

`MONGO_URL`



