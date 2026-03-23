import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { toggleTheme } from '../store/slices/themeSlice';
import toast from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const { isDark } = useSelector((state: RootState) => state.theme);
  const { admin } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleSaveProfile = () => {
    toast.success('Profile settings saved successfully');
  };

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved successfully');
  };

  const handleSaveSystem = () => {
    toast.success('System settings saved successfully');
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Settings
              </Typography>
              <Box component="form" sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Name"
                  defaultValue={admin?.name}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={admin?.email}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Role"
                  defaultValue={admin?.role}
                  margin="normal"
                  disabled
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleSaveProfile}
                >
                  Save Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appearance
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Dark Mode"
                    secondary="Toggle between light and dark theme"
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      checked={isDark}
                      onChange={() => dispatch(toggleTheme())}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email Notifications"
                    secondary="Receive email notifications for new orders"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Low Stock Alerts"
                    secondary="Get notified when products are low in stock"
                  />
                  <ListItemSecondaryAction>
                    <Switch defaultChecked />
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="New User Registrations"
                    secondary="Notifications for new user sign-ups"
                  />
                  <ListItemSecondaryAction>
                    <Switch />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleSaveNotifications}
              >
                Save Notifications
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* System Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                System Settings
              </Typography>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Site Name"
                  defaultValue="EShop"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Support Email"
                  defaultValue="support@eshop.com"
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Currency"
                  defaultValue="INR"
                  margin="normal"
                />
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleSaveSystem}
                >
                  Save System Settings
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Security Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Security
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    margin="normal"
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="warning"
                sx={{ mt: 2 }}
                onClick={() => toast.success('Password updated successfully')}
              >
                Update Password
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};