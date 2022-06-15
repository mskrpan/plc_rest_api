import express from "express";
import datasRoutes from "./api/routes/datas.js";
import morgan from "morgan";
import connectToDB from "./api/database/db.js"
import {connAndRead} from "./api/plc/plc.js"


const app = express();

//db connection
connectToDB();

//plc conn and read data
connAndRead();

//morgan nam služi da čita iz next što se dešava
app.use(morgan("dev"));
//body parser url i json, kako bi mogli poslati json na POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//haders, * - any1 can connect
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    //govorimo što točno browser može poslat
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//rute
app.use("/datas", datasRoutes);

//hendlanje errora ako ne nađe ništa od rute /datas
//handeling errors 1.0 nema rute
app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});
//handeling errors 1.1 npr. neki error koji nije povezan s rutama
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app;
