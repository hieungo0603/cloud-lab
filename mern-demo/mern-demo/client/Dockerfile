# Sử dụng Node.js làm Base Image
FROM node:18

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy các file cấu hình package
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ mã nguồn Frontend vào container
COPY . .

# Mở port 3000 cho React/Frontend
EXPOSE 3000

# Lệnh khởi chạy ứng dụng
CMD ["npm", "start"]