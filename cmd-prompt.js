const childProcess = require("child_process");

const cmd = `node ${__dirname}/main.js`

if (process.platform == 'win32') {
    // childProcess.execSync('start cmd /k tasklist', { stdio: 'inherit' });
    console.log("Windows");

} else if (process.platform === 'linux' || process.platform === 'darwin') {
    console.log("Mac/Linux");
    // childProcess.execSync('xterm -e ps -ef &', { stdio: 'inherit' });
    // childProcess.execSync('ps -ef | less', { stdio: 'inherit' });
    // childProcess.execSync('gnome-terminal -- ps -ef &', { stdio: 'inherit' });
    // childProcess.execSync('osascript -e \'tell application "Terminal" to activate\' -e \'tell application "Terminal" to do script "ps -ef"\'', { stdio: 'inherit' });
    childProcess.execSync(`osascript -e 'tell application "Terminal" to activate' -e 'tell application "Terminal" to do script "${cmd}"'`, { stdio: 'inherit' });
} else {
    console.log('Unsupported platform');
}