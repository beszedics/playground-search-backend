import { s3Client } from '../utils/awsS3';
import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

dotenv.config();

const PLAYGROUNDS = 'playgrounds';

const getImagesUrlsForPlayground = async () => {
  const prefix = `playgrounds/1/`;

  const listObjectsParams = {
    Bucket: process.env.AWS_BUCKET,
    Prefix: prefix,
  };

  try {
    const response = await s3Client.send(
      new ListObjectsV2Command(listObjectsParams)
    );

    const imageKeys = response.Contents?.map((object) => object.Key);

    const filteredImageKeys = imageKeys?.filter(
      (key) => key !== `${prefix}` && key !== PLAYGROUNDS
    );

    const imageUrls = filteredImageKeys?.map((key) => {
      const imageUrl = `${process.env.AWS_BUCKET_URI}/${key}`;
      return imageUrl;
    });

    return imageUrls;
  } catch (error: any) {
    console.log(error.message);
  }
};

export default getImagesUrlsForPlayground;
