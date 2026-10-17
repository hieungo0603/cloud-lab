import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ name: '', studentId: '', major: '', age: '' });
  const [editingId, setEditingId] = useState(null); // Lưu ID của sinh viên đang được chọn sửa

  // 1. Lấy danh sách sinh viên từ Backend (GET)
  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (err) {
      console.error('Lỗi khi tải danh sách sinh viên:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // 2. Xử lý Thêm mới (POST) hoặc Cập nhật (PUT)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Gọi API PUT để sửa thông tin sinh viên
        await axios.put(`${API_URL}/${editingId}`, formData);
        alert('Cập nhật thông tin sinh viên thành công!');
        setEditingId(null);
      } else {
        // Gọi API POST để thêm sinh viên mới
        await axios.post(API_URL, formData);
        alert('Thêm sinh viên thành công!');
      }
      setFormData({ name: '', studentId: '', major: '', age: '' });
      fetchStudents(); // Tải lại danh sách sau khi thao tác thành công
    } catch (err) {
      console.error('Lỗi khi lưu thông tin sinh viên:', err);
      alert(editingId ? 'Cập nhật sinh viên thất bại!' : 'Thêm sinh viên thất bại!');
    }
  };

  // 3. Chọn sinh viên để Sửa
  const handleEdit = (stu) => {
    setEditingId(stu._id);
    setFormData({
      name: stu.name || '',
      studentId: stu.studentId || '',
      major: stu.major || '',
      age: stu.age || ''
    });
  };

  // 4. Hủy bỏ chế độ Sửa
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ name: '', studentId: '', major: '', age: '' });
  };

  // 5. Xóa sinh viên theo ID (DELETE)
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchStudents();
      } catch (err) {
        console.error('Lỗi khi xóa sinh viên:', err);
        alert('Xóa sinh viên thất bại!');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Ứng dụng Quản lý Sinh viên (MERN Stack)</h2>

      {/* Form nhập liệu */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Họ tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Mã SV"
          value={formData.studentId}
          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="text"
          placeholder="Chuyên ngành"
          value={formData.major}
          onChange={(e) => setFormData({ ...formData, major: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />
        <input
          type="number"
          placeholder="Tuổi"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          required
          style={{ marginRight: '10px', padding: '5px' }}
        />

        <button
          type="submit"
          style={{
            padding: '6px 12px',
            backgroundColor: editingId ? '#1890ff' : '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {editingId ? 'Lưu Cập Nhật' : 'Thêm Sinh Viên'}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{
              padding: '6px 12px',
              backgroundColor: '#8c8c8c',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            Hủy
          </button>
        )}
      </form>

      {/* Bảng danh sách sinh viên */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ padding: '8px' }}>Họ tên</th>
            <th style={{ padding: '8px' }}>Mã SV</th>
            <th style={{ padding: '8px' }}>Chuyên ngành</th>
            <th style={{ padding: '8px' }}>Tuổi</th>
            <th style={{ padding: '8px' }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((stu) => (
              <tr key={stu._id}>
                <td style={{ padding: '8px' }}>{stu.name}</td>
                <td style={{ padding: '8px' }}>{stu.studentId}</td>
                <td style={{ padding: '8px' }}>{stu.major}</td>
                <td style={{ padding: '8px' }}>{stu.age}</td>
                <td style={{ padding: '8px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(stu)}
                    style={{
                      backgroundColor: '#faad14',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '3px',
                      marginRight: '5px'
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(stu._id)}
                    style={{
                      backgroundColor: '#ff4d4f',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      cursor: 'pointer',
                      borderRadius: '3px'
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '10px' }}>Chưa có sinh viên nào</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;