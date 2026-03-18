const https = require('https');

console.log('🧪 測試 API...\n');

const postData = JSON.stringify({
  companyName: 'TechCorp',
  companyCulture: '創新導向',
  mission: '改變世界',
  jobTitle: '全棧工程師',
  originalJD: '我們尋找一個全棧工程師加入我們的團隊',
  styleId: 'startup'
});

const options = {
  hostname: 'employer-brand-optimizer.vercel.app',
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  console.log(`Status: ${res.statusCode}\n`);
  console.log('Response:\n');
  
  res.on('data', chunk => {
    data += chunk;
    process.stdout.write(chunk);
  });
  
  res.on('end', () => {
    console.log('\n\n✅ API 響應完成');
    
    if (res.statusCode !== 200) {
      console.log('\n⚠️  API 返回非 200 狀態碼');
      try {
        const json = JSON.parse(data);
        console.log('錯誤信息:', JSON.stringify(json, null, 2));
      } catch (e) {
        // 可能是流式響應
      }
    }
  });
});

req.on('error', (e) => {
  console.error('❌ 請求錯誤:', e);
});

req.write(postData);
req.end();

// 5 秒後超時
setTimeout(() => {
  console.log('\n⏱️  請求超時（5 秒後）');
  process.exit(1);
}, 5000);
