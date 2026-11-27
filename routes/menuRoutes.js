
const express = require("express");
const router = express.Router();

const {
    getAllMenu,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
} = require("../controllers/menuController");

// GET - Semua menu
router.get("/", getAllMenu);

// GET - Menu berdasarkan ID
router.get("/:id", getMenuById);

// POST - Tambah menu
router.post("/", createMenu);

// PUT - Edit menu
router.put("/:id", updateMenu);

// DELETE - Hapus menu
router.delete("/:id", deleteMenu);

module.exports = router;
