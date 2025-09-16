// 代码生成时间: 2025-09-16 19:03:13
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@apollo/client';
import { promises as fsPromises } from 'fs';
import sharp from 'sharp';
import path from 'path';

// Define the GraphQL endpoint URL
const GRAPHQL_ENDPOINT = 'https://your-graphql-endpoint.com/graphql';

// Apollo Client configuration
const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

// GraphQL query to fetch images
const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      url
      width
      height
    }
  }
`;

// Function to resize an image
async function resizeImage(image: { url: string; width: number; height: number }, targetWidth: number, targetHeight: number): Promise<void> {
  try {
    const inputBuffer = await sharp(image.url).toBuffer();
    const outputBuffer = await sharp(inputBuffer)
      .resize({ width: targetWidth, height: targetHeight })
      .toBuffer();

    const outputPath = path.join(__dirname, 'resized', `${path.basename(image.url)}`);
    await fsPromises.writeFile(outputPath, outputBuffer);
    console.log(`Resized image saved to ${outputPath}`);
  } catch (error) {
    console.error(`Error resizing image: ${error.message}`);
  }
}

// Main function to handle batch resizing
async function batchResizeImages(targetWidth: number, targetHeight: number): Promise<void> {
  try {
    // Fetch images from GraphQL endpoint
    const { data } = await client.query({ query: GET_IMAGES });
    const images = data.images;

    // Resize each image
    await Promise.all(images.map(image => resizeImage(image, targetWidth, targetHeight)));
  } catch (error) {
    console.error(`Error fetching or resizing images: ${error.message}`);
  }
}

// Example usage
batchResizeImages(800, 600)
  .then(() => console.log('Batch resizing completed successfully'))
  .catch(error => console.error('Batch resizing failed:', error));