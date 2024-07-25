import React, { useState } from 'react';
import { TextField, Button, Tabs, Tab, Box } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
  });

function CreatePost() {
    const [selectedTab, setSelectedTab] = useState(0);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
      };

    return (
        <Box sx={{ padding: 3 }}>
            <h2>Create Post</h2>

            <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab label="Text" />
                <Tab label="Images & Video" />
            </Tabs>

            <Box sx={{ padding: 2 }}>
                {selectedTab === 0 && (
                    <Box>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Title"
                            required
                            inputProps={{ maxLength: 300 }}
                            helperText="0/300"
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Body"
                            multiline
                            rows={6}
                            sx={{ marginBottom: 2 }}
                        />
                        <Button variant="contained" color="primary">Post</Button>
                    </Box>
                )}
                {selectedTab === 1 && (
                    <Box>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label="Title"
                            required
                            inputProps={{ maxLength: 300 }}
                            helperText="0/300"
                            sx={{ marginBottom: 2 }}
                        />
                        <label htmlFor="icon-button-file">
                            <Input accept="image/*,video/*" id="icon-button-file" type="file" onChange={handleFileChange} />
                            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
                                Upload
                            </Button>
                        </label>
                        {selectedFile && (
                        <Box sx={{ marginTop: 2 }}>
                            <h4>Selected file:</h4>
                            <p>{selectedFile.name}</p>
                        </Box>
                        )}
                        <Button variant="contained" color="primary">Post</Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default CreatePost;
