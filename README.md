# to-project

### ROUTE API

# admins

semua route admin dikasih middleware (untuk melakukan pengecekan, hanya role "admin" yg boleh masuk page ini)

| Method | Route                       | Description                   |
| ------ | --------------------------- | ----------------------------- |
| GET    | /admins                     | Menampilkan halaman admin     |
| GET    | /admins/users               | Menampilkan semua user        |
| GET    | /admins/products            | Menampilkan semua product     |
| GET    | /admins/orders              | Menampilkan semua order       |
| GET    | /admins/products/add        | Menampilkan form add product  |
| POST   | /admins/products/add        | Menambah data product         |
| GET    | /admins/products/:id        | Menampilkan detail product    |
| PUT    | /admins/products/:id/edit   | Menampilkan form edit product |
| PATCH  | /admins/products/:id/update | Mengubah data product         |
| DELETE | /admins/products/:id/delete | Menghapus product             |
