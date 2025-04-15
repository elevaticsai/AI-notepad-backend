import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-west-2',
  });


  
export const uploadFileToS3 = async (file)=> {
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
        const data = await s3.upload(params).promise();
        return data.Location;
      } catch (error) {
        console.error('Error uploading to S3:', error);
        throw new Error('Error uploading file');
      }
};
    