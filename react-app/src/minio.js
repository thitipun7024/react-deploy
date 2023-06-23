import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import SendIcon from '@mui/icons-material/Send';
import AWS from 'aws-sdk';
import React, {  useState } from "react";


AWS.config.update({
	endpoint: '192.168.10.19:9000',
	accessKeyId: 'th-thitipun',
	secretAccessKey: 'H2w6RohzXRlQzus4D5JFwF1XGSwTqvTmtBnUjdCi',
	s3ForcePathStyle: true,
	signatureVersion: 'v4',
	sslEnabled: false, // Change to true if your Minio server uses SSL
  });
  

  const s3 = new AWS.S3();
  
  const ImageUploader = () => {const [selectedImage, setSelectedImage] = useState(null);
	const handleImageUpload = (event) => {const file = event.target.files[0];
		setSelectedImage(file);
		console.log(event)
	};
	
	
	
				
		
	const handleSaveToMinio = () => {
    alert("success")
		console.log()
		if (selectedImage) {
		  const bucketName = 'th-thitipun';
		  const objectKey = selectedImage.name;
		  //alert(file.name)
		  const params = {
			Bucket: bucketName,
			Key: objectKey,
			Body: selectedImage,
			ACL: 'public-read',
			
		  };
		s3.upload(params, function (error, data) {
		  if (error) {
			console.error('Error uploading image: ', error);
		  } else {
			console.log('Image uploaded successfully. Location: ', data.Location);
      window.location.href = '/showminio';
		  }
		});
	  }
	};
  
	return (
    <Container sx={{ p:2 }} maxWidth="sm">    
    <div>
         <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
          >
        <Avatar alt="Travis Howard" src="https://cdn.dribbble.com/users/1061278/screenshots/12883393/wolf3.png" sx={{ width: 70, height: 150 }}/>
        <Typography component="h1" variant="h5">
          User
        </Typography>
        <p></p>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name='file'
              id="file"
              type="file"
              onChange={handleImageUpload}
            />
            <p></p>
            {selectedImage && (
          <div>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" height={365} />
            </div>
          )}
          </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={handleSaveToMinio}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 10 }}
            endIcon={<SendIcon />}
          >
            Add image
          </Button>
      </Box>
    </div>
  </Container>
  );
  };
  function App() {
	return (
	  <div>
		<ImageUploader />
	  </div>
	);
  }
  
  
  export default App;