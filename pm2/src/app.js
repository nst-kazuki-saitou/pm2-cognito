require('dotenv').config();

// Expressの設定
const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, '../static')));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Cognitoインスタンス生成
const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
});
const cognito = new AWS.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18'
});

const crypto = require('crypto');

app.post('/auth', async(req, res) => {
  const userPoolId = process.env.IDP_POOL_ID
  const clientId = process.env.IDP_CLIENT_ID
  const clientSecret = process.env.IDP_CLIENT_SECRET
  const username = req.body.userId
  const password = req.body.password

  try {
    // シークレットハッシュ計算
    const secretHash = crypto.createHmac('sha256', clientSecret).update(username + clientId).digest('base64');
    // サインイン
    const user = await cognito.adminInitiateAuth({
      AuthFlow: 'ADMIN_NO_SRP_AUTH',
      ClientId: clientId,
      UserPoolId: userPoolId,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: secretHash
      }
    }).promise();
    res.send('Login success!');
  }
  catch (err) {
    console.log(err);
    //res.send('Login failed...');
    res.send(err);
  }
});

app.listen(8080, () => {
  console.log('Express app starts, listening port on 8080.')
});

// 環境変数のテスト（PM2の設定ファイルより指定）
console.log('NODE_NEV:', process.env.NODE_ENV);
console.log('SECRET_KEY:', process.env.SECRET_KEY);
console.log('IDP_POOL_ID:', process.env.IDP_POOL_ID);
console.log('IDP_CLIENT_ID:', process.env.IDP_CLIENT_ID);
console.log('IDP_CLIENT_SECRET:', process.env.IDP_CLIENT_SECRET);
