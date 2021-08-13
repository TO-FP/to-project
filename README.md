#### API DOCUMENTATION

---

### Command :

| Command        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| npm run create | membuat dummy data untuk Users, Products, Products_image   |
| npm run delete | menghapus dummy data untuk Users, Products, Products_image |

# FRONTEND API

| Method | Route         | Description       |
| ------ | ------------- | ----------------- |
| POST   | /api/register | Membuat user baru |

- #### Request

  - ##### Headers

    ```json
    {
      "headers": {
        "Content-Type": "multipart/form-data"
      }
    }
    ```

  - ##### Body

    ```json
    {
      "name": "example",
      "email": "example@mail.com",
      "password": "example123",
      "gender": "male", // male | female
      "birthdate": "2021-08-12",
      "type": "user", // user | admin
      "file": InputFile
    }
    ```

- #### Response

  - ##### Success (200) :

    ```json
    {
      "status": 201,
      "message": "New user has been created!"
    }
    ```

  - ##### Failed (500) :

    ```json
    {
      "status": 500,
      "name": "SequelizeValidationError",
      "errors": [
        {
          ...
        },
      ]
    }
    ```

| Method | Route      | Description |
| ------ | ---------- | ----------- |
| POST   | /api/login | Login user  |

- #### Request

  - ##### Body

    ```json
    {
      "email": "example@mail.com",
      "password": "example123"
    }
    ```

- #### Response

  - ##### Success (200) :

    ```json
    {
      "status": 200,
      "message": "You are successfully logged in"
    }
    ```

  - ##### Invalid Password (401) :

    ```json
    {
      "status": 401,
      "message": "Password is invalid!"
    }
    ```

  - ##### User Not Found (404) :

    ```json
    {
      "status": 404,
      "message": "User not found!"
    }
    ```

  - ##### Failed (500) :

    ```json
    {
      "status": 500,
      "name": "SequelizeValidationError",
      "errors": [
        {
          ...
        },
      ]
    }
    ```

| Method | Route          | Description                   |
| ------ | -------------- | ----------------------------- |
| GET    | /api/home-page | Menampilkan 3 product terbaru |

- #### Request

  - None

- #### Response

  - ##### Success (200) :

    ```json
    {
      "products": [
        {
          "id": 96,
          "name": "Converse RUN STAR HIKE Unisex Sneakers Shoes",
          "desc": "SEGALANYA. Chuck Taylor All Star yang ikonik mendapatkan penyegaran ringan di Run Star Hike.",
          "price": 1099000,
          "stock": 6,
          "expire": "2021-08-11T11:41:43.494Z",
          "weight": 500,
          "category": "Sneakers",
          "brand": "Converse",
          "condition": "New",
          "totalSold": 0,
          "rating": 0,
          "views": 0,
          "createdAt": "2021-08-11T11:41:43.446Z",
          "updatedAt": "2021-08-11T11:41:43.446Z",
          "User": {
            "name": "admin 2"
          },
          "Products_images": [
            {
              "fileName": "converse-run-star-3.jpg",
              "primary": false
            },
            {
              "fileName": "converse-run-star-2.jpg",
              "primary": false
            },
            {
              "fileName": "converse-run-star-1.jpg",
              "primary": true
            }
          ]
        },
        {
          ...
        },
        {
          ...
        }
      ]
    }
    ```

| Method | Route                | Description                  |
| ------ | -------------------- | ---------------------------- |
| GET    | /api/products/:page? | Menampilkan seluruh products |

- #### Request

  - Params
    `page (Optional)`

- #### Response

  - ##### Success (200) :

    ```json
    {
      "products": [
        {
          "id": 96,
          "name": "Converse RUN STAR HIKE Unisex Sneakers Shoes",
          "desc": "SEGALANYA. Chuck Taylor All Star yang ikonik mendapatkan penyegaran ringan di Run Star Hike.",
          "price": 1099000,
          "stock": 6,
          "expire": "2021-08-11T11:41:43.494Z",
          "weight": 500,
          "category": "Sneakers",
          "brand": "Converse",
          "condition": "New",
          "totalSold": 0,
          "rating": 0,
          "views": 0,
          "createdAt": "2021-08-11T11:41:43.446Z",
          "updatedAt": "2021-08-11T11:41:43.446Z",
          "User": {
            "name": "admin 2"
          },
          "Products_images": [
            {
              "fileName": "converse-run-star-3.jpg",
              "primary": false
            },
            {
              "fileName": "converse-run-star-2.jpg",
              "primary": false
            },
            {
              "fileName": "converse-run-star-1.jpg",
              "primary": true
            }
          ]
        },
        ...
      ]
    }
    ```

| Method | Route                    | Description                 |
| ------ | ------------------------ | --------------------------- |
| GET    | /api/product-details/:id | Menampilkan product details |

- #### Request

  - ##### Params

- #### Response

  - ##### Success (200) :

    ```json
    {
      "product": {
        "id": 97,
        "name": "New Balance 574 LS Men's Sneaker Shoes - Grey",
        "desc": "Sneaker 574 pria adalah ikon koleksi. Dengan garis-garis yang bersih, warna-warna yang terinspirasi oleh universitas, dan profil klasik.",
        "price": 1599000,
        "stock": 12,
        "expire": "2021-08-11T11:41:43.495Z",
        "weight": 500,
        "category": "Sneakers",
        "brand": "New Balance",
        "condition": "New",
        "totalSold": 0,
        "rating": 0,
        "views": 0,
        "createdAt": "2021-08-11T11:41:43.446Z",
        "updatedAt": "2021-08-11T11:41:43.446Z",
        "User": {
          "name": "admin 1"
        },
        "Products_images": [
          {
            "fileName": "new-balance-574-3.jpg",
            "primary": false
          },
          {
            "fileName": "new-balance-574-1.jpg",
            "primary": true
          },
          {
            "fileName": "new-balance-574-2.jpg",
            "primary": false
          }
        ]
      }
    }
    ```

| Method | Route               | Description                |
| ------ | ------------------- | -------------------------- |
| PUT    | /api/account/update | Mengupdate profile account |

- #### Request

  - ##### Headers

    ```json
    {
      "headers": {
        "Content-Type": "multipart/form-data",
        "access_token": "ex: cH3KJ20dGssxf551S2"
      }
    }
    ```

  - ##### Body

    ```json
    {
      "name" : "example",
      "birthdate": "2021-13-08",
      "gender": "male",
      "file": InputFile
    }
    ```

- #### Response

  - ##### Success (200) :

    ```json
    {
      "status": 200,
      "message": "User data has been updated!"
    }
    ```

  - ##### Failed (500) :

    ```json
    {
      "status": 500,
      "name": "SequelizeValidationError",
      "errors": [
        {
          ...
        },
      ]
    }
    ```
