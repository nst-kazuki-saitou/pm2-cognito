# PM2-Cognito

## 概要

PM2からCognito連携するテスト

## Dockerビルドと実行

```bash
docker build -t pm2-cognito .
docker run -p 8080:8080 -it --rm pm2-cognito
# Access to http://localohost:8080/
```
