module.exports = {
  apps: [{
    name: 'bratan-server',
    script: './lib/server.js',
    output: './logs/out.log',
    error: './logs/error.log',
    merge_logs: true,
  }]
};
