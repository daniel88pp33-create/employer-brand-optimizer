const https = require('https');

const token = 'vcp_1cR0dttKvadBWHZ2Oo7AI7etd9EDE4NomRwQvFD306W3roNe7d124var';

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.vercel.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 檢查 Vercel 部署狀態...\n');

  // 1. 檢查用戶
  console.log('1️⃣  驗證 Token...');
  try {
    const user = await makeRequest('/v1/user');
    if (user.status === 200) {
      console.log(`✅ Token 有效 - 用戶: ${user.data.user.email}\n`);
    } else {
      console.log(`❌ Token 無效 (Status: ${user.status})\n`);
      process.exit(1);
    }
  } catch (e) {
    console.log(`❌ 錯誤: ${e.message}\n`);
    process.exit(1);
  }

  // 2. 獲取項目
  console.log('2️⃣  查找項目...');
  try {
    const projects = await makeRequest('/v9/projects');
    const project = projects.data.projects.find(p => p.name === 'employer-brand-optimizer');
    
    if (project) {
      console.log(`✅ 找到項目: ${project.name}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   狀態: ${project.status}\n`);

      // 3. 獲取最新部署
      console.log('3️⃣  檢查最近部署...');
      const deployments = await makeRequest(`/v13/deployments?projectId=${project.id}&limit=5`);
      
      if (deployments.data.deployments && Array.isArray(deployments.data.deployments)) {
        deployments.data.deployments.forEach((d, i) => {
          const date = new Date(d.createdAt).toLocaleString('zh-TW');
          console.log(`   ${i + 1}. [${d.state}] ${date}`);
          if (d.url) console.log(`      URL: https://${d.url}`);
          if (d.error) console.log(`      ❌ 錯誤: ${d.error.message}`);
        });
      } else {
        console.log('   ⚠️  無法獲取部署列表');
        console.log('   回應:', JSON.stringify(deployments.data, null, 2));
      }
      
      console.log('\n4️⃣  檢查環境變數...');
      const envVars = await makeRequest(`/v9/projects/${project.id}/env`);
      if (envVars.status === 200) {
        if (envVars.data.envs && Array.isArray(envVars.data.envs)) {
          const hasApiKey = envVars.data.envs.some(e => e.key === 'ANTHROPIC_API_KEY');
          if (hasApiKey) {
            console.log('✅ ANTHROPIC_API_KEY 已設置');
            const apiKeyVar = envVars.data.envs.find(e => e.key === 'ANTHROPIC_API_KEY');
            console.log(`   值: ${apiKeyVar.value.substring(0, 20)}...`);
          } else {
            console.log('❌ ANTHROPIC_API_KEY 未設置！');
            console.log('   已設置的變數:');
            envVars.data.envs.forEach(e => console.log(`     - ${e.key}`));
          }
        } else {
          console.log('⚠️  無法讀取環境變數');
        }
      } else {
        console.log(`❌ 無法獲取環境變數 (Status: ${envVars.status})`);
      }
      
    } else {
      console.log('❌ 項目未找到');
      console.log('   可用項目:');
      projects.data.projects.forEach(p => console.log(`     - ${p.name}`));
    }
  } catch (e) {
    console.log(`❌ 錯誤: ${e.message}`);
    process.exit(1);
  }
}

main();
