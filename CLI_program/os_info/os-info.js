const { program } = require('commander');
const os = require('os');
const fs = require('fs');

program.version('1.0.0').description('OS Info CLI');

program
  .command('platform')
  .description('Display the operating system platform')
  .action(() => {
    console.log('Platform:', os.platform());
  });

program
  .command('architecture')
  .description('Display the operating system architecture')
  .action(() => {
    console.log('Architecture:', os.arch());
  });

program
  .command('hostname')
  .description('Display the host name of the operating system')
  .action(() => {
    console.log('Hostname:', os.hostname());
  });

program
  .command('total-memory')
  .description('Display the total memory of the operating system')
  .action(() => {
    console.log('Total Memory:', formatBytes(os.totalmem()));
  });

program
  .command('free-memory')
  .description('Display the free memory of the operating system')
  .action(() => {
    console.log('Free Memory:', formatBytes(os.freemem()));
  });

program
  .command('cpu-info')
  .description('Display information about the CPUs')
  .action(() => {
    console.log('CPU Info:', os.cpus());
  });

program
  .command('network-interfaces')
  .description('Display information about the network interfaces')
  .action(() => {
    console.log('Network Interfaces:', os.networkInterfaces());
  });

program
  .command('boot-time')
  .description('Display the system boot time')
  .action(() => {
    console.log('Boot Time:', new Date(os.uptime() * 1000).toLocaleString());
  });

program
  .command('user-info')
  .description('Display information about the current user')
  .action(() => {
    console.log('User Info:', os.userInfo());
  });

program
  .command('file-system-info')
  .description('Display information about the file system')
  .action(() => {
    console.log('File System Info:', fs.statSync('.'));
  });

program
  .command('env-vars')
  .description('Display information about the environment variables')
  .action(() => {
    console.log('Environment Variables:', process.env);
  });

program
  .command('current-directory')
  .description('Display the current working directory')
  .action(() => {
    console.log('Current Directory:', process.cwd());
  });

program.parse(process.argv);

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
