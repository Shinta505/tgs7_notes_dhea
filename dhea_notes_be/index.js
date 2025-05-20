import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import CatatanRoute from "./routes/CatatanRoute.js"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.set("view engine", "ejs");

dotenv.config();

app.use(cookieParser());
const allowedOrigins = [
  'https://e-13-450704.uc.r.appspot.com'
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Tambahan: handle preflight agar aman
app.options('*', cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(CatatanRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));
