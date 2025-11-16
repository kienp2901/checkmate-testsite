const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

console.log('🔐 Đang tạo chứng chỉ SSL tự ký cho localhost...');

const certsDir = path.join(__dirname, '../certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir, { recursive: true });
  console.log('📁 Đã tạo thư mục "certs/"');
}

function checkMkcertInstalled() {
  try {
    execSync('mkcert -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

function installMkcert() {
  const platform = os.platform();
  
  console.log('❌ mkcert chưa được cài đặt!');
  console.log('📥 Hướng dẫn cài đặt mkcert:');
  
  if (platform === 'win32') {
    console.log('🪟 Windows:');
    console.log('1. Cài đặt Chocolatey (nếu chưa có):');
    console.log('   Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString("https://community.chocolatey.org/install.ps1"))');
    console.log('2. Cài đặt mkcert:');
    console.log('   choco install mkcert');
  } else if (platform === 'darwin') {
    console.log('🍎 macOS:');
    console.log('   brew install mkcert');
  } else {
    console.log('🐧 Linux:');
    console.log('   curl -JLO "https://dl.filippo.io/mkcert/latest?for=linux/amd64"');
    console.log('   chmod +x mkcert-v*-linux-amd64');
    console.log('   sudo cp mkcert-v*-linux-amd64 /usr/local/bin/mkcert');
  }
  
  console.log('3. Chạy lại: npm run setup:ssl');
  process.exit(1);
}

function createCertificates() {
  try {
    console.log('🔑 Đang tạo Certificate Authority (CA) local...');
    execSync('mkcert -install', { stdio: 'inherit' });
    
    console.log('📜 Đang tạo chứng chỉ cho localhost...');
    execSync('mkcert -key-file certs/localhost-key.pem -cert-file certs/localhost.pem localhost 127.0.0.1 ::1', { stdio: 'inherit' });
    
    console.log('✅ Hoàn thành! Chứng chỉ SSL đã được tạo trong thư mục "certs/"');
    console.log('🚀 Bây giờ bạn có thể chạy: npm run dev:https');
    console.log('');
    console.log('📱 Để truy cập từ điện thoại:');
    console.log('1. Tìm địa chỉ IP của máy tính: ipconfig (Windows) hoặc ifconfig (Mac/Linux)');
    console.log('2. Truy cập: https://[IP_ADDRESS]:3000');
    console.log('3. Chấp nhận cảnh báo bảo mật trên điện thoại (do chứng chỉ tự ký)');
  } catch (error) {
    console.error('❌ Lỗi khi tạo chứng chỉ:', error.message);
    process.exit(1);
  }
}

if (!checkMkcertInstalled()) {
  installMkcert();
} else {
  createCertificates();
}


