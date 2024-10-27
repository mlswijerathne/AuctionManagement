import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AdminService from '../services/adminService';

const AdminDashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, [tabValue]);

  const fetchData = async () => {
    if (tabValue === 0) {
      const response = await AdminService.getAllUsers();
      if ('error' in response) {
        setError(response.error);
      } else {
        setUsers(response);
      }
    } else {
      const response = await AdminService.getAllAuctions();
      if ('error' in response) {
        setError(response.error);
      } else {
        setAuctions(response);
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const response = await AdminService.deleteUser(userId);
      if ('error' in response) {
        setError(response.error);
      } else {
        setSuccessMessage('User deleted successfully');
        fetchData();
      }
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    if (window.confirm('Are you sure you want to delete this auction?')) {
      const response = await AdminService.deleteAuction(auctionId);
      if ('error' in response) {
        setError(response.error);
      } else {
        setSuccessMessage('Auction deleted successfully');
        fetchData();
      }
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setError('');
    setSuccessMessage('');
  };

  const stringToColor = (string) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  };

  const UserProfiles = () => (
    <Grid container spacing={3}>
      {users.map((user) => user ? (
        <Grid item xs={12} sm={6} md={4} key={user.email}>
          <Card 
            sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: stringToColor(user.userName),
                    mb: 1
                  }}
                >
                  {user.userName.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" component="div">
                  {user.userName}
                </Typography>
                <Chip 
                  label={user.role}
                  color={user.role === 'Admin' ? 'primary' : 'default'}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ mt: 'auto', justifyContent: 'flex-end' }}>
              <IconButton
                color="error"
                onClick={() => handleDeleteUser(user.id)}
                disabled={user.role === 'Admin'}
                title={user.role === 'Admin' ? 'Cannot delete admin user' : 'Delete user'}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ) : null)}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab 
            label="Users" 
            icon={<PersonIcon />} 
            iconPosition="start"
          />
          <Tab 
            label="Auctions" 
            icon={<PersonIcon />} 
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {tabValue === 0 && <UserProfiles />}

      {tabValue === 1 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Start Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {auctions.map((auction) => (
                <TableRow key={auction.id}>
                  <TableCell>{auction.title}</TableCell>
                  <TableCell>{auction.user ? auction.user.userName : 'N/A'}</TableCell>
                  <TableCell>${auction.startPrice}</TableCell>
                  <TableCell>
                    <Chip 
                      label={auction.status}
                      color={auction.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteAuction(auction.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminDashboard;