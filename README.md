#### API DOCUMENTATION

---

### Command :

| Command        | Description                                                |
| -------------- | ---------------------------------------------------------- |
| npm run create | membuat dummy data untuk Users, Products, Products_image   |
| npm run delete | menghapus dummy data untuk Users, Products, Products_image |

# BACKEND API

## admin

| Method | Route   | Description                         |
| ------ | ------- | ----------------------------------- |
| GET    | /admins | Menampilkan halaman dashboard admin |

### /admins/users

| Method | Route         | Description            |
| ------ | ------------- | ---------------------- |
| GET    | /admins/users | Menampilkan semua user |

### /admins/products

| Method | Route                       | Description                   |
| ------ | --------------------------- | ----------------------------- |
| GET    | /admins/products            | Menampilkan semua product     |
| GET    | /admins/products/add        | Menampilkan form add product  |
| POST   | /admins/products/add        | Menambah data product         |
| GET    | /admins/products/:id        | Menampilkan detail product    |
| GET    | /admins/products/:id/edit   | Menampilkan form edit product |
| PUT    | /admins/products/:id/update | Mengubah data product         |
| DELETE | /admins/products/:id/delete | Menghapus product             |

### /admins/orders

| Method | Route                     | Description              |
| ------ | ------------------------- | ------------------------ |
| GET    | /admins/orders            | Menampilkan semua order  |
| GET    | /admins/orders/:id        | Menampilkan detail order |
| PATCH  | /admins/orders/:id/update | Mengubah status order    |

---

# FRONTEND API

| Method | Route         | Description       |
| ------ | ------------- | ----------------- |
| POST   | /api/register | Membuat user baru |

- #### Request

  - ##### Body

  ```json
  {
    "name": "example",
    "email": "example@mail.com",
    "password": "example123",
    "gender": "male", // male | female
    "birthdate": "2021-08-12",
    "avatar": "via.placeholder.com/350",
    "type": "user" // user | email
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

  - ##### Wrong Password (401) :

  ```json
  {
    "status": 401,
    "message": "Login failed, email and password do not match!"
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

| Method | Route         | Description                  |
| ------ | ------------- | ---------------------------- |
| GET    | /api/products | Menampilkan seluruh products |

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
