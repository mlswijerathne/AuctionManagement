import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  InputLabel,
  FormControl,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const OwnAuctionEditBox = ({
  formData,
  previewImage,
  error,
  loading,
  onInputChange,
  onImageChange,
  onSubmit,
  onCancel,
}) => {
  // Render loading spinner if loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Render error message if error is present
  if (error) {
    return (
      <Alert severity="error" className="max-w-lg mx-auto mt-8">
        {error}
      </Alert>
    );
  }

  // Render the form if data is loaded and there's no error
  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader 
          title={
            <Typography variant="h5" sx={{ color: 'black', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: '#ff8c00' }}>Edit </span>
              <span>Auction</span>
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-6">
            <FormControl fullWidth margin="normal">
              <TextField
                id="title"
                name="title"
                label="Title"
                value={formData.title}
                onChange={onInputChange}
                required
                fullWidth
                placeholder="Enter auction title"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="description"
                name="description"
                label="Description"
                value={formData.description}
                onChange={onInputChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Enter auction description"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                id="endTime"
                name="endTime"
                label="End Time"
                type="date"
                value={formData.endTime}
                onChange={onInputChange}
                required
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                style={{ display: 'none' }}
              />
              <InputLabel 
                htmlFor="photo" 
                shrink 
                style={{ position: 'static', marginBottom: '8px' }}
              >
                Auction Photo
              </InputLabel>
              <label htmlFor="photo">
                <Button
                  variant="contained"
                  component="span"
                  startIcon={<PhotoCamera />}
                  sx={{
                    backgroundColor: '#ff8c00', // Orange color
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#e07b00', // Darker orange on hover
                    },
                  }}
                >
                  Upload Photo
                </Button>
              </label>
              {previewImage && (
                <div className="mt-2">
                  <img
                    src={previewImage}
                    alt="Auction preview"
                    className="max-w-xs rounded-lg"
                  />
                </div>
              )}
            </FormControl>

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outlined" 
                onClick={onCancel} 
                sx={{
                  borderColor: '#ff8c00', // Orange border color
                  color: '#ff8c00', // Orange text color
                  '&:hover': {
                    borderColor: '#e07b00', // Darker orange on hover
                    color: '#e07b00', // Darker orange on hover
                  },
                }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                sx={{
                  backgroundColor: '#ff8c00', // Orange color
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#e07b00', // Darker orange on hover
                  },
                }}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnAuctionEditBox;