import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  Alert,
  Paper,
  Tooltip,
  IconButton,
  Zoom
} from '@mui/material';
import { formatDistance } from 'date-fns';
import GavelIcon from '@mui/icons-material/Gavel';
import InfoIcon from '@mui/icons-material/Info';

const BidSectionBox = ({ 
  bidAmount,
  onBidAmountChange,
  onBidSubmit,
  error,
  success,
  highestBid,
  bidHistory = [],
  isOwner,
  startingPrice
}) => {
  // Helpers
  const safetyBidHistory = Array.isArray(bidHistory) ? bidHistory : [];

  const isValidBidAmount = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return false;
    if (numAmount <= startingPrice) return false;
    if (highestBid && numAmount <= highestBid.amount) return false;
    return true;
  };

  const formatDateTime = (dateString) => {
    try {
      if (!dateString) return 'N/A';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Invalid Date';
      
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  const getTimeAgo = (dateString) => {
    try {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '';
      
      return formatDistance(date, new Date(), { addSuffix: true });
    } catch (error) {
      console.error('Time ago calculation error:', error);
      return '';
    }
  };

  const getMinimumBid = () => {
    return highestBid ? highestBid.amount + 1 : startingPrice + 1;
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 800, mx: 'auto' }}>
      {/* Bid Placement Section */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <GavelIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h5" component="h2">
            Place Your Bid
          </Typography>
        </Box>
        
        {error && (
          <Zoom in={true}>
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          </Zoom>
        )}
        {success && (
          <Zoom in={true}>
            <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>
          </Zoom>
        )}

        <Box component="form" onSubmit={onBidSubmit} sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <TextField
            label="Bid Amount ($)"
            type="number"
            value={bidAmount}
            onChange={(e) => onBidAmountChange(e.target.value)}
            required
            disabled={isOwner}
            error={!isValidBidAmount(bidAmount) && bidAmount !== ''}
            helperText={
              isOwner 
                ? "You cannot bid on your own auction" 
                : `Minimum bid: $${getMinimumBid()}`
            }
            InputProps={{
              inputProps: { 
                min: getMinimumBid(),
                step: '0.01'
              }
            }}
            sx={{ flexGrow: 1 }}
            fullWidth
          />
          <Button 
            type="submit"
            variant="contained"
            disabled={isOwner || !isValidBidAmount(bidAmount)}
            sx={{ 
              backgroundColor: 'orange',
              minWidth: '120px',
              height: { sm: '56px' },
              '&:hover': { backgroundColor: '#ff8c00' },
              '&.Mui-disabled': {
                backgroundColor: 'grey.300'
              }
            }}
          >
            Place Bid
          </Button>
        </Box>

        {/* Current Price Display */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="subtitle1" color="text.secondary">
            Starting Price: ${startingPrice.toFixed(2)}
          </Typography>
          {highestBid && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="h6" color="primary" sx={{ display: 'flex', alignItems: 'center' }}>
                Current Highest Bid: ${highestBid.amount.toFixed(2)}
                <Tooltip title="Current leading bid" arrow>
                  <IconButton size="small" sx={{ ml: 1 }}>
                    <InfoIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                by {highestBid.userFullName}
                {highestBid.createdAt && ` • ${getTimeAgo(highestBid.createdAt)}`}
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>

      {/* Bid History Section */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="h5" component="h2">
            Bid History
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {safetyBidHistory.length} {safetyBidHistory.length === 1 ? 'bid' : 'bids'}
          </Typography>
        </Box>
        
        <List sx={{ bgcolor: 'background.paper' }}>
        {safetyBidHistory.map((bid, index) => (
    <div key={bid.id || index}>
        <ListItem sx={{ px: 2, py: 1.5 }}>
            <ListItemText
                primary={
                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'baseline' 
                    }}>
                        <Typography 
                            variant="body1" 
                            component="span" 
                            sx={{ 
                                fontWeight: index === 0 ? 'bold' : 'normal',
                                color: index === 0 ? 'primary.main' : 'text.primary'
                            }}
                        >
                            ${bid.amount?.toFixed(2)}
                            {index === 0 && (
                                <Typography 
                                    component="span" 
                                    variant="caption" 
                                    sx={{ ml: 1, color: 'success.main' }}
                                >
                                    (Highest Bid)
                                </Typography>
                            )}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {formatDateTime(bid.createdAt)}
                        </Typography>
                    </Box>
                }
                secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                            Bid by: {bid.userFullName || 'Anonymous'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {getTimeAgo(bid.createdAt)}
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
        {index < safetyBidHistory.length - 1 && <Divider />}
    </div>
))}
          {safetyBidHistory.length === 0 && (
            <ListItem>
              <ListItemText 
                primary="No bids yet"
                secondary="Be the first to place a bid!"
                sx={{ textAlign: 'center', py: 3 }}
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default BidSectionBox;
