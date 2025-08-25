# Introduction

This repository serves as a template for building modern web applications. The folder structure and codebase have been designed with clarity, scalability, and maintainability in mind, making it easy to extend and adapt for future development.

## Client side
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React.js](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js&logoColor=white)](https://nextjs.org/)

The client side of the application is built using modern JavaScript libraries and frameworks for building user interfaces, including **React.js** and **Next.js**. To ensure type safety and improve code readability, the project uses TypeScript instead of plain JavaScript. The configuration also includes support for **Mantine - a growing UI component library**, allowing for fast and elegant interface development.

## Server side
[![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)

The backend is built in **Python** using **FastAPI** — a modern, high‑performance web framework known for its simplicity, speed, and strong typing support. Leveraging Python’s rich ecosystem, this project can seamlessly integrate with tools for data analysis, machine learning, and database interaction. FastAPI provides a clean and efficient way to build APIs, while **Pydantic** (together with **SQLModel**) ensures robust data validation, serialization, and type‑safe interaction with the database.

# Installation & Deployment

This application is intended to run on **Nginx** as a reverse proxy server. The deployment assumes a dual-port setup for frontend and backend services.

## Prerequisites
[![Nginx](https://img.shields.io/badge/Nginx-009639?logo=nginx&logoColor=white)](https://nginx.org/)
[![Miniconda](https://img.shields.io/badge/Miniconda-3-2F855A?logo=anaconda&logoColor=white)](https://docs.conda.io/en/latest/miniconda.html)
[![Node.js](https://img.shields.io/badge/Node.js-23-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![npm](https://img.shields.io/badge/npm-11-CB3837?logo=npm&logoColor=white)](https://www.npmjs.com/)
[![PM2](https://img.shields.io/badge/PM2-2B037A?logo=pm2&logoColor=white)](https://pm2.keymetrics.io/)
[![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)](https://www.sqlite.org/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)


Before you begin, ensure the following dependencies are installed on your server:

- Miniconda
- Nginx 
- Node.js and npm
- pm2 (Process Manager 2 installed globally from npm)
- SQLite3
- Docker server for MySQL

Python and all required backend dependencies will be installed via the provided Miniconda setup script in a separate virtual environment.

## Environment setup

Check for available ports:

```shell
sudo lsof -i :9000
sudo lsof -i :9001
```

Set environment variables in the `.env` file in the application root:

```
# KEYS
SECRET_KEY='YourApp_secret#key!'

# ENVIRONMENTS
CONDA_ENV='react_app'

# PORTS
CLIENT_PORT='9000' # SERVER
NEXT_PUBLIC_SERVER_PORT='9001' # CLIENT # SERVER

# PRODUCTION
NEXT_PUBLIC_PRODUCTION='False' # CLIENT # SERVER
NEXT_PUBLIC_PRODUCTION_SERVER_IP='10.20.1.194' # CLIENT # SERVER
```

- ***PRODUCTION_SERVER*** should be set to the IP address of the machine within your local network.

- ***CONDA_ENV*** variable indicated conda virutal environment name used for building backend. If you have already installed conda this will indicate the environment.

## Database

The application must have a connection to MySQL database server. Database is configured using [ORM](server/data/__init__.py) approach.

### MySQL server setup

```shell
# Downloading the image
docker pull mysql/mysql-server

# Builing the container
docker run --name mysql --restart always -m 4g -e MYSQL_ROOT_PASSWORD=rootpasswd -p 3306:3306 -v mysql_dane:/var/lib/mysql -d mysql/mysql-server:latest

# Preferrably add a user and grant the access to the database.
docker exec -it mysql /bin/bash

# In the container
mysql -u root -p
mysql> CREATE DATABASE applications;
mysql> CREATE USER 'app_user'@'%' IDENTIFIED BY 'apppasswd';
mysql> GRANT ALL PRIVILEGES ON applications.* TO 'app_user'@'%';
mysql> FLUSH PRIVILEGES;

# Check if only the user you have created has access to the database outside the localhost:
mysql> SELECT User, Host FROM mysql.user;
+------------------+-----------+
| User             | Host      |
+------------------+-----------+
| app_user         | %         |
| healthchecker    | localhost |
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+

# Check databases
mysql> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| applications       |
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+

```

## Build

```shell
# Frontend in /client
npm install
npm run client-build

# Backend in /server
npm run server-build
```

## DNS & Nginx server configuration

Create a reverse proxy configuration file `/etc/nginx/conf.d/app.confv` for NGINX:

### NGINX Reverse Proxy

```shell
conf="
server {
    listen 80;
    server_name yourservername.com;

    proxy_set_header Host \$host;

    location / {
        proxy_pass http://<IP><PORT>;
    }

    location /api/ {
        proxy_pass http://<IP><PORT>;
    }
}
"
echo "\$conf" | sudo tee /etc/nginx/conf.d/app.conf > /dev/null
sudo systemctl reload nginx
```

## Deploy

```shell
pm2 start ecosystem.config.js
```