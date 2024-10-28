import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Avatar, Divider, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdminService from '../services/adminService';

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        const [usersResponse, auctionsResponse] = await Promise.all([
          AdminService.getAllUsers(),
          AdminService.getAllAuctions()
        ]);

        if (usersResponse.error) {
          throw new Error(usersResponse.error);
        }
        if (auctionsResponse.error) {
          throw new Error(auctionsResponse.error);
        }

        setUsers(usersResponse);
        setAuctions(auctionsResponse);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to fetch admin data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      setError(null);
      const response = await AdminService.deleteUser(userId);
      if (response.error) {
        throw new Error(response.error);
      }
      // Update users list after successful deletion
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    try {
      setError(null);
      const response = await AdminService.deleteAuction(auctionId);
      if (response.error) {
        throw new Error(response.error);
      }
      // Update auctions list after successful deletion
      setAuctions(auctions.filter(auction => auction.id !== auctionId));
    } catch (err) {
      setError(err.message || 'Failed to delete auction');
    }
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} thickness={4} sx={{ color: '#ff8c00' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: 'auto',
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: '#ffffff',
        boxShadow: 3,
      }}
    >
      {/* Admin Dashboard Header */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          mb: 4,
          color: 'black',
        }}
      >
        Admin Dashboard
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {error}
        </Typography>
      )}

      {/* Statistics Overview */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 4 }}>
        <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2, width: '200px' }}>
          <Typography variant="h6" sx={{ color: '#ff8c00', fontWeight: 'bold' }}>
            Total Users
          </Typography>
          <Typography variant="h4">{users.length}</Typography>
        </Box>
        <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#f5f5f5', borderRadius: 2, width: '200px' }}>
          <Typography variant="h6" sx={{ color: '#ff8c00', fontWeight: 'bold' }}>
            Total Auctions
          </Typography>
          <Typography variant="h4">{auctions.length}</Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Users Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Recent Users
      </Typography>
      <Box sx={{ mb: 4 }}>
        {users.slice(0, 5).map((user) => (
          <Box
            key={user.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              mb: 1,
              bgcolor: '#f8f8f8',
              borderRadius: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar sx={{ mr: 2 }}>{user.userName?.[0]?.toUpperCase()}</Avatar>
              <Box>
                <Typography variant="body1">{user.userName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </Box>
            <Button
              onClick={() => handleDeleteUser(user.id)}
              variant="outlined"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Auctions Section */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Recent Auctions
      </Typography>
      <Box>
        {auctions.slice(0, 5).map((auction) => (
          <Box
            key={auction.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 2,
              mb: 1,
              bgcolor: '#f8f8f8',
              borderRadius: 1,
            }}
          >
            <Box>
              <Typography variant="body1">{auction.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Status: {auction.status}
              </Typography>
            </Box>
            <Button
              onClick={() => handleDeleteAuction(auction.id)}
              variant="outlined"
              color="error"
              size="small"
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>

      {/* View All Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff8c00',
            '&:hover': { backgroundColor: '#e07b00' },
          }}
          onClick={() => navigate('/admin/users')}
        >
          View All Users
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#ff8c00',
            '&:hover': { backgroundColor: '#e07b00' },
          }}
          onClick={() => navigate('/admin/auctions')}
        >
          View All Auctions
        </Button>
      </Box>
    </Box>
  );
};

export default AdminProfile;