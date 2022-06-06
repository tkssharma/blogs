# nest-js-aws-cdk-lamda-deployment
Deploy your NestJS application to AWS Lambda with AWS CDK.

![logo](https://blog.theodo.com/static/7d1614ffec5ffb9bfee74cb7cf455109/c7dcc/serverless-nestJS-1.png)

## Deployment
AWS account is required.
After cloning this repo all you need to do build an application and deploy it.

* In backend directory `lambda/api`:
```
yarn build
```
* In root dir `/`:
```
yarn build
yarn cdk deploy
```

Go to AWS CloudFormation to verify that everything is up and running.
You can now start building your backend.

## Details
Powered by `aws-serverless-express`. NestJs applications is being bootstraped in our `BackendLambda`, then all the request are being redirected to NestJS server.
We cache the server instance in order to have it ready for lamda's warm start (`lambda/api/index.ts`).
