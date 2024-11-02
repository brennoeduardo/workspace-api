import {
    S3Client,
    S3ServiceException,
    PutObjectCommand
} from "@aws-sdk/client-s3";
import dotenv from 'dotenv';

dotenv.config();

export const uploadToImageS3 = async (file: File ) => {
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    if (!accessKeyId || !secretAccessKey) throw new Error("Credenciais não configuradas");

    const region = process.env.AWS_REGION;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const objectKey = `images-perfil/${file.name}`;   
    const arrayBuffer = await file.arrayBuffer();
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

    } catch (caught) {
        if (caught instanceof S3ServiceException) {
            console.error(`${caught.name}: ${caught.message}`);
        } else {
            throw caught;
        }
    }
};
