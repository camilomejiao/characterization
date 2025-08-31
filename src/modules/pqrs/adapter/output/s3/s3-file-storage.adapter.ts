import { Injectable } from '@nestjs/common';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { extname } from 'path';
import { getSignedUrl as s3GetSignedUrl } from '@aws-sdk/s3-request-presigner';

//Interface
import { IFileSigningPortRepository } from '../../../domain/output-ports/s3/file-signing.port.repository';

@Injectable()
export class S3FileStorageAdapter implements IFileSigningPortRepository {
  private readonly s3 = new S3Client({
    region: process.env.AWS_REGION ?? 'us-east-1',
  });
  private readonly bucket = process.env.AWS_S3_BUCKET_NAME!;
  private readonly ttl = Number(process.env.S3_SIGNED_URL_TTL ?? 300);
  private readonly defaultPrefix = process.env.S3_PREFIX ?? 'pqrs/';
  constructor() {
    console.log('S3FileSigningAdapter constructed');
  }

  async getSignedUrl(urlOrKey: string, opts?: { expiresIn?: number }) {
    const key = urlOrKey?.startsWith('http')
      ? new URL(urlOrKey).pathname.replace(/^\/+/, '')
      : urlOrKey;
    const cmd = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return s3GetSignedUrl(this.s3, cmd, {
      expiresIn: opts?.expiresIn ?? this.ttl,
    });
  }

  async upload(file: Express.Multer.File): Promise<string> {
    const prefix = this.defaultPrefix.replace(/^\/+/, '');
    const fileExt = extname(file.originalname) || '';
    const key = `${prefix}${Date.now()}-${Math.round(Math.random() * 1e9)}${fileExt}`;

    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ServerSideEncryption: 'AES256',
      }),
    );

    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }
}
