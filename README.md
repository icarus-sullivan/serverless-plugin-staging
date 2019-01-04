![npm downloads total](https://img.shields.io/npm/dt/serverless-plugin-staging.svg) ![npm version](https://img.shields.io/npm/v/serverless-plugin-staging.svg) ![npm license](https://img.shields.io/npm/l/serverless-plugin-staging.svg)

## Installation

```sh
npm install serverless-plugin-staging --save-dev
```
or
```sh
yarn add serverless-plugin-staging --dev
```

## Usage

In your project's serverless file, add `serverless-plugin-staging` within the plugins entry.

Example:

```yaml
plugins:
  - serverless-plugin-staging
```

## Configuration
To restrict which assets are deployed within a stage, create a custom variable named `staging`. Within that staged variable, `excludeFunctions` will be used to control what functions are ignored during a deployment, and the `excludeResources` to control the resources.

_Example excluding the function prodFunctionHandler from deploying on beta stage_
```yaml
custom:
  staging:
    excludeFunctions:
      beta: 
        - prodFunctionHandler
```

_Example excluding the Uploads S3 Bucket from deploying on beta stage_
```yaml
custom: 
  staging:
    excludeResources:
      beta:
        - UploadsBucket
```

_Complete Example_
```yaml
service: serverless-plugin-staging-example

custom: 
  staging:
    excludeFunctions:
      beta:
        - prodFunctionHandler
    excludeResources:
      beta:
        - UploadsBucket

provider:
  name: aws
  runtime: nodejs8.10
  region: us-west-2 

functions:
  prodFunctionHandler:
    handler: handlers.prodLambda
  normalFunctionHandler:
    handler: handlers.normalLambda

resources: 
  Resources:
    UploadsBucket:
      Type: AWS::S3::Bucket
      Properties:
        BucketName: Uploads

plugins:
  - serverless-plugin-staging
```
