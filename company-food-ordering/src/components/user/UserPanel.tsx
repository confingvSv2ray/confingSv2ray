import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Avatar,
  Button,
} from '@mui/material';
import { RestaurantMenu, Logout } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UserPanel: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
              }}
            >
              <RestaurantMenu sx={{ fontSize: 50 }} />
            </Avatar>
            
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              پنل کاربر عادی
            </Typography>
            
            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
              خوش آمدید، {user?.fullName}
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              این بخش در حال توسعه است و به زودی امکانات کامل سفارش غذا اضافه خواهد شد.
            </Typography>
            
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={logout}
              sx={{ borderRadius: 2 }}
            >
              خروج از حساب
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default UserPanel;