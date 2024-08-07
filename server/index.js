import express from 'express';
import cors from 'cors';
import http from 'http';
import sessionConfig from './config/session.js';
import mainRoute from "./routes/index.js"
// import socketHandler from './sockets/chatSocket.js';
import { errorHandler } from './utils/errorHandler.js';


const app = express();
const server = http.createServer(app);
const sessionMiddleware = sessionConfig();

// // CORS middleware
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's address
  credentials: true
}));

app.get("/danishan", (req, res) => {
  res.json({ name: "Danishan" });
});


app.use(express.json());
app.use(sessionMiddleware);

app.use("/api", mainRoute);
app.use(errorHandler);

// socketHandler(server, sessionMiddleware);

const port = process.env.SERVER_PORT || 5001;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
