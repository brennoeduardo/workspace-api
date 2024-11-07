import { UserAttributes } from "../../../src/database/schemas/user/interface";
import { S3Client, S3ServiceException, PutObjectCommand } from "@aws-sdk/client-s3";

import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION;
const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const uploadToImageS3 = async (file: Express.Multer.File, user: UserAttributes) => {

    if (!accessKeyId || !secretAccessKey) throw new Error("Credenciais não configuradas");

    file.filename = `${user.id}-${user.name}.png`;


    const objectKey = `images-perfil/${file.filename}`;
    const arrayBuffer = file.buffer;
    const buffer = Buffer.from(arrayBuffer);

    const client = new S3Client({
        region,
        endpoint: `https://${bucketName}.s3.${region}.amazonaws.com`,
        forcePathStyle: true,
        credentials: {
            accessKeyId,
            secretAccessKey,
        }
    });

    try {

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: objectKey,
            Body: buffer,
            ContentType: 'image/png',
            ContentLength: file.size,
            ACL: 'public-read',
        })

        const response = await client.send(command);

        if (response.$metadata.httpStatusCode !== 200) {
            throw new S3ServiceException({
                message: "Erro ao fazer upload do arquivo",
                $fault: "client",
                $metadata: response.$metadata,
                name: "S3ServiceException",
            });
        }

        return {
            url: `https://${bucketName}.s3.${region}.amazonaws.com/${bucketName}/${objectKey}`,
            key: objectKey
        }

    } catch (caught) {
        if (caught instanceof S3ServiceException) {
            console.error(`${caught.name}: ${caught.message}`);
        } else {
            throw caught;
        }
    }
};

export const getAvatarFromS3 = async (Key: string) => {
    if (!accessKeyId || !secretAccessKey) throw new Error("Credenciais não configuradas");

    const client = new S3Client({
        region,
        endpoint: `https://${bucketName}.s3.${region}.amazonaws.com`,
        forcePathStyle: true,
        credentials: {
            accessKeyId,
            secretAccessKey,
        }
    });

    try {

        const command = new PutObjectCommand({ Bucket: bucketName, Key })

        const response = await client.send(command);

        if (response.$metadata.httpStatusCode !== 200) {
            throw new S3ServiceException({
                message: "Erro ao fazer upload do arquivo",
                $fault: "client",
                $metadata: response.$metadata,
                name: "S3ServiceException",
            });
        }

        return {
            url: `https://${bucketName}.s3.${region}.amazonaws.com/${Key}`,
            Key
        }

    } catch (caught) {
        if (caught instanceof S3ServiceException) console.error(`${caught.name}: ${caught.message}`);
        else throw caught;
    }
}

