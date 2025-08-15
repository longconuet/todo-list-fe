# GIAI ĐOẠN 1: Build ứng dụng React
# Sử dụng một image Node.js chính thức làm image cơ sở. Chọn phiên bản LTS.
FROM node:20-alpine AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json (hoặc yarn.lock)
COPY package*.json ./

# Cài đặt các dependencies của dự án một cách an toàn
RUN npm ci

# Sao chép toàn bộ mã nguồn của dự án vào thư mục làm việc
COPY . .

# 1. Khai báo một build-time argument. Tên này phải trùng với tên bạn truyền từ file workflow.
ARG VITE_API_URL
# 2. Gán argument đó vào một biến môi trường để lệnh "npm run build" có thể truy cập.
ENV VITE_API_URL=$VITE_API_URL
# -------------------------

# Build ứng dụng cho môi trường production
RUN npm run build

# GIAI ĐOẠN 2: Phục vụ ứng dụng bằng Nginx
# Sử dụng một image Nginx nhẹ và ổn định
FROM nginx:1.27-alpine

# Sao chép các file tĩnh đã được build từ giai đoạn 'builder'
# vào thư mục mặc định của Nginx để phục vụ web
COPY --from=builder /app/dist /usr/share/nginx/html

# Sao chép file cấu hình Nginx tùy chỉnh (sẽ tạo ở bước tiếp theo)
# File này cần thiết để xử lý routing phía client (ví dụ: React Router)
COPY ./.docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 để cho phép truy cập từ bên ngoài
EXPOSE 80

# Lệnh để khởi động Nginx khi container chạy
CMD ["nginx", "-g", "daemon off;"]