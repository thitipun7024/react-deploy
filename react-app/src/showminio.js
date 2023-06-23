import Container from '@mui/material/Container';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
//import AddIcon from '@mui/icons-material/Add';
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import AWS from 'aws-sdk';

AWS.config.update({
    endpoint: '192.168.10.19:9000',
	accessKeyId: 'th-thitipun',
	secretAccessKey: 'H2w6RohzXRlQzus4D5JFwF1XGSwTqvTmtBnUjdCi',
	s3ForcePathStyle: true,
	signatureVersion: 'v4',
	sslEnabled: false, // Change to true if your Minio server uses SSL
  });

  const s3 = new AWS.S3();


  const ImageGallery = () => {
    const [imageUrls, setImageUrls] = useState([]);
  
    useEffect(() => {
      const fetchImages = async () => {
        try {
          const params = {
            Bucket: 'th-thitipun', // Replace with your S3 bucket name
          };
          //1 list object from params -------------
          const data = await s3.listObjects(params).promise();
          //2 create url from object
          const urls = await Promise.all(
            data.Contents.map(async (object) => {
              console.log(object)  // example {Key: 'yung.png', LastModified: Wed Jun 14 2023 15:18:40 GMT+0700 (Indochina Time), ETag: '"819c860a6d2d690858871af6588fce51"', ChecksumAlgorithm: Array(0), Size: 309257, …}
              const getObjectParams = {
                Bucket: 'th-thitipun', // Replace with your S3 bucket name
                Key: object.Key,
              };
  
              const objectData = await s3.getObject(getObjectParams).promise();
              const imageBlob = new Blob([objectData.Body]);
              return URL.createObjectURL(imageBlob);
            })
          );
  
          setImageUrls(urls);
          //console.log(urls)
        } catch (error) {
          console.error('Error retrieving images:', error);
        }
      };
  
      fetchImages();
    }, []);
  
    return (
      <ImageList sx={{ width: 800, height: 450 }} cols={3} rowHeight={164}>
        {imageUrls.map((url, index) => (
          //console.log(index),
          <img key={index} src={url} alt={` ${index + 1}`} 
          style={{ width: '250px', height: '200px' }}/>
        ))}
        </ImageList>
    );
  };
  const App = () => {
    return (
      <Container sx={{ p:4 }} maxWidth="sm">    
    <div>
         <Box
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
          >
        <h1>Minio Image</h1>
        <ImageGallery />
        <Link to="/createminio">
      <Button variant="outlined" startIcon={<AddCircleIcon />} color="primary">
        Addimage
      </Button>
            </Link>
        </Box>
    </div>
  </Container>
    );
  };
  export default App;    