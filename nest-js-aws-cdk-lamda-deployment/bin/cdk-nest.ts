#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { CdkNestStack } from '../lib/cdk-nest-stack';

const app = new cdk.App();
new CdkNestStack(app, 'CdkNestStack');
