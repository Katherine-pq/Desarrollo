import express from "express";
import connectDB from "./src/config/db.js";
import morgan from "morgan";
import cors from "cors"
import ProductRoutes from "./src/routes/Product.routes.js";
import CartRoutes from "./src/routes/Cart.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* Conexión a la base de datos */
connectDB();

/* middlewares */
app.use(express.json());
app.use(morgan("dev"));

/* const origenesPermitidos = ["http://127.0.0.1:5500"] 
const corsOptions = {
  origin: (origin, callback) => {
    if(!origin || origenesPermitidos.includes(origin)){
      callback(null, true)
    }else{
      callback(new Error("Cliente no permitido"))
    }
  }
} */

app.use(cors())

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

/* rutas */
app.use("/api/products", ProductRoutes);
app.use("/api/carts", CartRoutes);

/* ruta para servir el index.html */
app.use(express.static(path.join(__dirname, "../client")));

/* Ruta principal que devuelve index.html */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

/* puertos */
const PORT = process.env.PORT || 5000;

/* inicializando */
app.listen(PORT, () => {
  console.log("Servidor funcionado en el puerto " + PORT);
});

