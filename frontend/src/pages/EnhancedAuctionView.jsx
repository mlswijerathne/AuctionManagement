import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  TextField, 
  Snackbar,
  Alert,
  LinearProgress,
  Box,
  Chip,
  Avatar
} from '@mui/material';
import { Timer, Gavel, TrendingUp } from 'lucide-react';

const EnhancedAuctionView = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' });
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highestBid, setHighestBid] = useState(null);

  // Simulated countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBid = async () => {
    setLoading(true);
    try {
      // Simulated bid placement
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotification({
        open: true,
        message: 'Bid placed successfully!',
        severity: 'success'
      });
      setBidAmount('');
    } catch (error) {
      setNotification({
        open: true,
        message: 'Failed to place bid',
        severity: 'error'
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <Card className="mb-4">
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" component="h2">
              Current Auction
            </Typography>
            <Chip
              icon={<Timer className="w-4 h-4" />}
              label={`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
              color={timeLeft < 300 ? 'error' : 'primary'}
            />
          </div>

          <Box className="mb-4">
            <Typography variant="subtitle1" className="mb-2">
              Current Highest Bid
            </Typography>
            <Typography variant="h4" color="primary">
              ${highestBid || '0.00'}
            </Typography>
          </Box>

          <div className="flex gap-4 mb-4">
            <TextField
              fullWidth
              label="Your Bid Amount"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              type="number"
              disabled={loading}
            />
            <Button
              variant="contained"
              onClick={handleBid}
              disabled={loading}
              startIcon={<Gavel className="w-4 h-4" />}
            >
              Place Bid
            </Button>
          </div>

          {loading && <LinearProgress className="mb-4" />}

          <Typography variant="h6" className="mb-2">
            Recent Bids
          </Typography>
          <div className="space-y-2">
            {bidHistory.map((bid, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center gap-2">
                  <Avatar src={bid.userPhoto} alt={bid.userName} />
                  <Typography>{bid.userName}</Typography>
                </div>
                <Typography color="primary">${bid.amount}</Typography>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
      >
        <Alert severity={notification.severity}>
          {notification.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default EnhancedAuctionView;