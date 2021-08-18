#### API DOCUMENTATION

# FRONTEND API

#### /api/

### GET

| Method | Route                | Description                           |
| ------ | -------------------- | ------------------------------------- |
| GET    | /home-page           | Menampilkan produk untuk halaman home |
| GET    | /product-details/:id | Menampilkan detail produk             |
| GET    | /show-cart           | Menampilkan daftar keranjang belanja  |
| GET    | /order-summary       | Menampilkan order summary             |
| GET    | /show-order          | Menampilkan order                     |

#### POST

| Method | Route                            | Description                                |
| ------ | -------------------------------- | ------------------------------------------ |
| POST   | /register                        | Membuat user baru                          |
| POST   | /login                           | Login user                                 |
| POST   | /products/:page?                 | Mendapatkan product untuk halaman products |
| POST   | /products-by/:UserId/:page?      | Mendapatkan product dari user tertentu     |
| POST   | /product-details/:id/add-to-cart | Menambahkan produk ke keranjang            |
| POST   | /checkouts                       | Melakukan checkout                         |

#### PUT

| Method | Route                  | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| PUT    | /account/update        | Melakukan perubahan data pada user |
| PUT    | /check-carts/:id       | Melakukan checklist pada keranjang |
| PUT    | /carts/:id/update-item | Melakukan perubahan pada keranjang |

#### DELETE

| Method | Route                  | Description                      |
| ------ | ---------------------- | -------------------------------- |
| DELETE | /carts/:id/remove-item | Menghapus product pada keranjang |

# BACKEND API

#### /admins/

### GET

| Method | Route                             | Description                                         |
| ------ | --------------------------------- | --------------------------------------------------- |
| GET    | /products/:name?/:sort?/:page?    | Menampilkan seluruh products untuk halaman home     |
| GET    | /my-products/:name?/:sort?/:page? | Menampilkan products sesuai dengan admin yang login |
| GET    | /products-details/:id             | Menampilkan detail dari suatu product               |
| GET    | /orders                           | Menampilkan seluruh orders                          |
| GET    | /order-details/:name              | Menampilkan detail dari orders                      |

#### POST

| Method | Route         | Description                        |
| ------ | ------------- | ---------------------------------- |
| POST   | /products-add | Menambah product ke dalam database |

#### PUT

| Method | Route                              | Description                           |
| ------ | ---------------------------------- | ------------------------------------- |
| PUT    | /products/:id/update               | Melakukan perubahan data pada product |
| PUT    | /change-status-order/:name/:status | Melakukan perubahan status pada order |

#### DELETE

| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| DELETE | /products/:id/delete | Menghapus product |
