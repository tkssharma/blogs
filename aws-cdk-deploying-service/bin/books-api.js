#!/usr/bin/env node

// @ts-ignore: Cannot find declaration file
require('source-map-support/register');
const cdk = require('@aws-cdk/core');
const { BooksApiStack } = require('../lib/books-api-stack');

const app = new cdk.App();
new BooksApiStack(app, 'BooksApiStack');
