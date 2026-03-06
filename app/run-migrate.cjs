const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://admin:adminpassword@127.0.0.1:5488/appdb?sslmode=disable',
  connectionTimeoutMillis: 5000 // Ép nó báo lỗi sau 5 giây nếu bị treo
});

async function test() {
  console.log("Đang cố gắng kết nối qua cổng 5488...");
  try {
    await client.connect();
    console.log("✅ KẾT NỐI THÀNH CÔNG! (Lỗi là do Drizzle, không phải mạng)");
    const res = await client.query('SELECT NOW()');
    console.log("Thời gian DB:", res.rows[0]);
    await client.end();
  } catch (err) {
    console.error("❌ LỖI RỒI! Nguyên nhân thật sự là:");
    console.error(err.message);
  }
}

test();