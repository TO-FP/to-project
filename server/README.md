# to-project

### ROUTE API

# admins

semua route admin dikasih middleware (untuk melakukan pengecekan, hanya role "admin" yg boleh masuk page ini)

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
