
const supabase = require("../config/supabase");

// 1. GET - Menampilkan semua menu
const getAllMenu = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("menu")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;

        res.status(200).json({
            message: "Berhasil mengambil semua menu",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil data menu",
            error: error.message
        });
    }
};


// 2. GET - Menampilkan menu berdasarkan ID
const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("menu")
            .select("*")
            .eq("id", id)
            .maybeSingle();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({
                message: "Menu tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Berhasil mengambil detail menu",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil detail menu",
            error: error.message
        });
    }
};


// 3. POST - Menambahkan menu baru
const createMenu = async (req, res) => {
    try {
        const {
            nama,
            kategori,
            harga,
            foto,
            deskripsi,
            status
        } = req.body;

        if (!nama || !kategori || harga === undefined) {
            return res.status(400).json({
                message: "Nama, kategori, dan harga wajib diisi"
            });
        }

        const kategoriValid = [
            "Makanan Utama",
            "Minuman",
            "Makanan Penutup"
        ];

        if (!kategoriValid.includes(kategori)) {
            return res.status(400).json({
                message: "Kategori tidak valid"
            });
        }

        if (!Number.isInteger(Number(harga)) || Number(harga) <= 0) {
            return res.status(400).json({
                message: "Harga harus berupa angka lebih dari 0"
            });
        }

        if (status && !["on", "off"].includes(status)) {
            return res.status(400).json({
                message: "Status harus on atau off"
            });
        }

        const { data, error } = await supabase
            .from("menu")
            .insert([{
                nama,
                kategori,
                harga: Number(harga),
                foto: foto || "",
                deskripsi: deskripsi || "",
                status: status || "on"
            }])
            .select()
            .single();

        if (error) throw error;

        res.status(201).json({
            message: "Menu berhasil ditambahkan",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menambahkan menu",
            error: error.message
        });
    }
};


// 4. PUT - Mengedit menu
const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            nama,
            kategori,
            harga,
            foto,
            deskripsi,
            status
        } = req.body;

        if (!nama || !kategori || harga === undefined) {
            return res.status(400).json({
                message: "Nama, kategori, dan harga wajib diisi"
            });
        }

        const kategoriValid = [
            "Makanan Utama",
            "Minuman",
            "Makanan Penutup"
        ];

        if (!kategoriValid.includes(kategori)) {
            return res.status(400).json({
                message: "Kategori tidak valid"
            });
        }

        if (!Number.isInteger(Number(harga)) || Number(harga) <= 0) {
            return res.status(400).json({
                message: "Harga harus berupa angka lebih dari 0"
            });
        }

        if (status && !["on", "off"].includes(status)) {
            return res.status(400).json({
                message: "Status harus on atau off"
            });
        }

        const { data, error } = await supabase
            .from("menu")
            .update({
                nama,
                kategori,
                harga: Number(harga),
                foto: foto || "",
                deskripsi: deskripsi || "",
                status: status || "on"
            })
            .eq("id", id)
            .select()
            .maybeSingle();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({
                message: "Menu tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Menu berhasil diperbarui",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal memperbarui menu",
            error: error.message
        });
    }
};


// 5. DELETE - Menghapus menu
const deleteMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from("menu")
            .delete()
            .eq("id", id)
            .select()
            .maybeSingle();

        if (error) throw error;

        if (!data) {
            return res.status(404).json({
                message: "Menu tidak ditemukan"
            });
        }

        res.status(200).json({
            message: "Menu berhasil dihapus",
            data: data
        });

    } catch (error) {
        res.status(500).json({
            message: "Gagal menghapus menu",
            error: error.message
        });
    }
};


// Export semua fungsi
module.exports = {
    getAllMenu,
    getMenuById,
    createMenu,
    updateMenu,
    deleteMenu
};
