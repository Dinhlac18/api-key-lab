const express = require('express');
const app = express();

// Route kiểm tra API Key
app.get('/api/check-key', (req, res) => {
  // Lấy API Key từ Header người gọi gửi lên (x-api-key)
  const clientApiKey = req.headers['x-api-key'];
  // Lấy API Key được bảo mật trên biến môi trường của Vercel
  const serverApiKey = process.env.MY_API_KEY;

  // Kiểm tra nếu chưa truyền hoặc truyền sai Key
  if (!clientApiKey || clientApiKey !== serverApiKey) {
    return res.status(401).json({ 
      status: "Error", 
      message: "Unauthorized: API Key không hợp lệ hoặc bị thiếu!" 
    });
  }

  // Nếu đúng Key thì trả về kết quả thành công
  res.json({ 
    status: "Success", 
    message: "Xác thực API Key thành công! Bài thực hành hoàn tất." 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});

module.exports = app;