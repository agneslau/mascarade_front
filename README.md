# mascarade_front

This is front-end application for Mascarade Project, for La Mascarade de Lille
App will be run on 8081 port
It should dialog with back-end application on 8080 port run locally. To make it possible, you should add at project root a .env file containing following line :
```
VITE_APP_BASE_URL=http://localhost:8080/api/v1
```

## Pre-requisite

node.js >= 20.11.0
npm >= 10.4.0

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
