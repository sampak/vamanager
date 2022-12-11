import * as AWS from 'aws-sdk';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { config } from 'src/config';
const s3Client = new AWS.S3({
  apiVersion: '2006-03-01',
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
});

export const S3Client = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return s3Client as AWS.S3;
  }
);
