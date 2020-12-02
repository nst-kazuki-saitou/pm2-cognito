# PM2-Cognito

## 概要

PM2からCognito連携するテスト

## Dockerビルドと実行

```bash
docker build -t pm2-cognito .
docker run -p 3000:3000 -it --rm pm2-cognito
# Access to http://localohost:3000/
```
