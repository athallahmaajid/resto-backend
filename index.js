
const express = require("express");
const cors = require("cors");
const supabase = require("./config/supabase");
const menuRoutes = require("./routes/menuRoutes");


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/menu", menuRoutes);

// Halaman utama untuk mengecek server
app.get("/", (req, res) => {
    res.send("Backend Taste of Nusantara berjalan!");
});

// Mengecek koneksi Supabase
app.get("/test-db", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("menu")
            .select("id")
            .limit(1);

        if (error) {
            throw error;
        }

        res.status(200).json({
            message: "Supabase berhasil terhubung!",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Koneksi Supabase gagal",
            error: error.message
        });
    }
});

// Menjalankan server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const authenticate = require("./middleware/authenticate");

const app = express();

// Middleware
app.use(
  cors({
    exposedHeaders: ["X-Access-Token", "X-Token-Refreshed"]
  })
);
app.use(express.json());

// Endpoint utama
app.get("/", (req, res) => {
  res.json({
    message: "Taste of Nusantara backend berjalan"
  });
});

// Route Auth
app.use("/api/auth", authRoutes);

// Semua endpoint API selain route autentikasi wajib memakai Bearer token
app.use("/api", authenticate);

// Endpoint tidak ditemukan (404)
app.use((req, res) => {
  res.status(404).json({
    message: "Endpoint tidak ditemukan"
  });
});

// Menjalankan server secara lokal
if (require.main === module) {
  const PORT = process.env.PORT || 2000;

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

// Export untuk Vercel
module.exports = app;
