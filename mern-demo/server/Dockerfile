# Căn cứ Node.js Image làm Base Image
FROM node:18

# Thiết lập thư mục làm việc bên trong Container
WORKDIR /app

# Sao chép file package.json và package-lock.json
COPY package*.json ./

# Cài đặt các thư viện (packages)
RUN npm install

# Sao chép toàn bộ source code Backend vào Container
COPY . .

# Khai báo port 5000 cho Backend
EXPOSE 5000

# Lệnh khởi động Backend khi Container chạy
CMD ["npm", "start"]