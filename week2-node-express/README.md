# Week 2 - Node + Express

Endpoints:

- `GET /` → returns plain text `My Week 2 API!` (also serves `public/index.html`)
- `POST /user` → accepts JSON `{name, email}` and responds `Hello, [name]!` (400 if missing)
- `GET /user/:id` → returns `User [id] profile`

Run:

```bash
cd week2-node-express
npm install
npm start
```

Test examples:

```bash
curl -X POST http://localhost:3000/user -H 'Content-Type: application/json' -d '{"name":"Jezreel","email":"jez.kolade@gmail.com"}'

curl http://localhost:3000/user/5
```
