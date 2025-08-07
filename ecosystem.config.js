module.exports = {
    apps: [
        {
            name: "Client",
            cwd: "./client",
            exec_mode: "cluster",
            instances: 1,
            script: "npm",
            args: "run client-start",
            exp_backoff_restart_delay: 100,
            max_memory_restart: "400M",
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
