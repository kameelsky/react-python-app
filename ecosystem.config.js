module.exports = {
    apps: [
        {
            name: "Client",
            cwd: "./client",
            script: "npm",
            args: "run client-start",
            log_file: "../logs/client.log",
        },
        {
            name: "Server (w2)",
            cwd: "./server",
            script: "npm",
            args: "run server-start",
            log_file: "../logs/server.log",
        },
    ],
};
