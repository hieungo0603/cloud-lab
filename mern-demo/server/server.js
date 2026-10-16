const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. CHỐNG LỖI KẾT NỐI & CHO PHÉP ĐỌC DỮ LIỆU TỪ FORM (BẮT BUỘC)
app.use(cors());
app.use(express.json());

// 2. KẾT NỐI MONGODB ATLAS
const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('Kết nối MongoDB Atlas thành công!'))
  .catch((err) => console.error('Lỗi kết nối MongoDB:', err));

// 3. IMPORT MODEL STUDENT
const Student = require('./models/Student');

// 4. CÁC ROUTE API
// 4.1. Lấy danh sách tất cả sinh viên (GET)
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4.2. Thêm sinh viên mới (POST)
app.post('/api/students', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4.3. Cập nhật thông tin sinh viên theo ID (PUT) - BỔ SUNG MỚI
app.put('/api/students/:id', async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Trả về dữ liệu mới sau khi chỉnh sửa
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Không tìm thấy sinh viên!' });
    }

    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 4.4. Xóa sinh viên theo ID (DELETE)
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xóa sinh viên thành công!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. KHỞI ĐỘNG SERVER (LẮNG NGHE CỔNG 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});