const cdk = require('@aws-cdk/core');
const dynamodb = require('@aws-cdk/aws-dynamodb');

const lambda = require('@aws-cdk/aws-lambda');
const iam = require('@aws-cdk/aws-iam');
const apigw = require('@aws-cdk/aws-apigateway');


class BooksApiStack extends cdk.Stack {

  constructor(scope, id, props) {
    super(scope, id, props);


    // ** CREATE TABLE IN DYNAMODB **
    const booksCatalogTable = new dynamodb.Table(
      this,
      'tableBooksCatalog',
      {
        tableName: 'books-catalog',
        partitionKey: {
          name: 'id',
          type: dynamodb.AttributeType.STRING
        },
        billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
      }
    );

    // ** CREATE LISTBOOKS LAMBDA FUNCTION **
    const listBooks = new lambda.Function(this, 'listBooksLambda', {
      runtime: lambda.Runtime.NODEJS_10_X,
      functionName: 'list-books',
      description: 'returns list of all books in catalog',
      code: lambda.Code.asset('lambda'),
      handler: 'list.handler',
      environment: {
        DYNAMODB_TABLE: booksCatalogTable.tableName
      }
    });

    // ** CREATE API GATEWAY WITH GET METHOD **
    const booksApi = new apigw.LambdaRestApi(this, 'booksApi', {
      proxy: false,
      handler: listBooks
    });

    const booksApiResource = booksApi.root.addResource('books');
    const booksApiLambdaIntegration = new apigw.LambdaIntegration(
      listBooks
    );

    booksApiResource.addMethod('GET', booksApiLambdaIntegration);

    // ** SET PERMISSION FOR LAMBDA FUNCTION TO ACCESS DYNAMO DB TABLE **
    listBooks.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['dynamodb:Scan'],
        resources: [booksCatalogTable.tableArn]
      })
    );

  }
}

module.exports = { BooksApiStack }
