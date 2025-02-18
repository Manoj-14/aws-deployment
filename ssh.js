const { Client } = require("ssh2");
const readline = require("readline");

module.exports = {
    connectToSsh: (hostname, privateKeyPath) => {
        const connOption = {
            host: hostname,
            port: 22,
            username: 'ec2-user',
            privateKey: privateKeyPath
        }

        const connection = new Client();
        connection.on('ready', () => {
            console.log("connected to ec2 ssh");
            const installCmd = "sudo yum install nginx -y";
            const startCmd = "sudo systemctl start nginx";
            const enableCmd = "sudo systemctl enable nginx";
            connection.exec(installCmd, (err, stream) => {
                if (err) throw err;
                stream.on('close', (code, signal) => {
                    console.log(`Installation complete with code ${code} and signal ${signal}`);
                    connection.exec(startCmd, (err, stream) => {
                        if (err) throw err;
                        stream.on('close', (code, signal) => {
                            console.log(`Nginx started with code ${code} and signal ${signal}`);
                            connection.exec(enableCmd, (err, stream) => {
                                if (err) throw err;
                                stream.on('close', (code, signal) => {
                                    console.log(`Nginx enabled with code ${code} and signal ${signal}`);
                                    connection.end();
                                });
                            });
                        });
                    });
                }).on('data', (data) => {
                    console.log(data.toString());
                });
            });
        }).connect(connOption);
    }
}