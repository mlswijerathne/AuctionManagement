import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OwnAuctionEditBox from '../features/OwnAuctionEditBox';
import AuctionViewModel from '../viewModels/AuctionViewModel';
import { validateUpdateAuctionDto } from '../dto/auction/updateAuctionDto';

const OwnAuctionEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    endTime: '',
    auctionPicturePath: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
          console.log('Component: Fetching auction:', id);
          const response = await AuctionViewModel.getAuction(id);
          console.log('Component: ViewModel response:', response);
          
          if (response?.error) {
              console.error('Component: Error from ViewModel:', response);
              throw new Error(
                  response.details?.message || 
                  response.error || 
                  'Failed to fetch auction details'
              );
          }
  
          // Validate required fields
          if (!response.title) {
              throw new Error('Invalid auction data: Missing required fields');
          }
  
          setAuction(response);
          setFormData({
              title: response.title || '',
              description: response.description || '',
              endTime: response.endTime ? 
                       new Date(response.endTime).toISOString().split('T')[0] : 
                       '',
              auctionPicturePath: response.auctionPicturePath || ''
          });
  
          if (response.photoUrl) {
              setPreviewImage(response.photoUrl);
          }
      } catch (error) {
          const errorMessage = error.message || 'Failed to fetch auction details';
          console.error('Component: Error in fetchAuction:', {
              error,
              message: errorMessage,
              stack: error.stack
          });
          setError(errorMessage);
      } finally {
          setLoading(false);
      }
  
    };

    fetchAuction();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors when user starts typing
    setError(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setError(null); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Basic validation
      if (!formData.title?.trim()) {
        setError('Title is required');
        return;
      }

      if (!formData.endTime) {
        setError('End time is required');
        return;
      }

      // Create FormData
      const submitData = new FormData();
       // Log the data being sent
      console.log('Form data before submission:', {
        title: formData.title,
        description: formData.description,
        endTime: formData.endTime,
        hasImage: !!imageFile,
        auctionPicturePath: formData.auctionPicturePath
      });

      // Append data to FormData
      submitData.append('title', formData.title.trim());
      submitData.append('description', formData.description?.trim() || '');
      submitData.append('endTime', formData.endTime);
      
      if (imageFile) {
        submitData.append('photo', imageFile);
      } else if (formData.auctionPicturePath) {
        submitData.append('auctionPicturePath', formData.auctionPicturePath);
      }

      console.log('Submitting update for auction:', id);
      const response = await AuctionViewModel.updateAuction(id, submitData);
      console.log('Update response:', response);

      if (response?.error) {
        throw new Error(response.error);
      }
  
      console.log('Update successful, navigating to dashboard');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error during update:', error);
      setError(error.message || 'Failed to update auction. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <OwnAuctionEditBox
      formData={formData}
      previewImage={previewImage}
      error={error}
      loading={loading}
      onInputChange={handleInputChange}
      onImageChange={handleImageChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default OwnAuctionEditPage;