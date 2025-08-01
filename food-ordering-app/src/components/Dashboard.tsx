import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Button } from '@mui/material';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 4,
        direction: 'rtl',
        fontFamily: 'Vazir, Arial, sans-serif',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          خوش آمدید، {user?.name}
        </Typography>
        <Button 
          variant="outlined" 
          onClick={logout}
          sx={{ 
            borderRadius: 2,
            px: 3,
          }}
        >
          خروج
        </Button>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        نقش شما: {user?.role === 'admin' ? 'مدیر' : user?.role === 'chef' ? 'آشپز' : user?.role === 'vip' ? 'کاربر ویژه' : 'کاربر عادی'}
      </Typography>

      <Box
        sx={{
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          border: '1px solid rgba(25, 118, 210, 0.3)',
          borderRadius: 2,
          p: 3,
          mt: 4,
        }}
      >
        <Typography variant="body1" sx={{ mb: 2 }}>
          سیستم سفارش غذا در حال توسعه است. امکانات زیر به زودی اضافه خواهند شد:
        </Typography>
        
        {user?.role === 'admin' && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>امکانات مدیر:</Typography>
            <ul>
              <li>مدیریت غذاها</li>
              <li>مدیریت غذاهای فرعی</li>
              <li>مدیریت کاربران</li>
              <li>پنل تنظیمات ظاهری</li>
              <li>تنظیمات نمایش منو</li>
            </ul>
          </Box>
        )}

        {user?.role === 'chef' && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>امکانات آشپز:</Typography>
            <ul>
              <li>مشاهده لیست سفارشات</li>
              <li>تایید سفارشات</li>
            </ul>
          </Box>
        )}

        {(user?.role === 'regular' || user?.role === 'vip') && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>امکانات کاربر:</Typography>
            <ul>
              <li>مشاهده منوی هفتگی</li>
              <li>ثبت سفارش غذا</li>
              <li>انتخاب غذاهای فرعی</li>
              {user?.role === 'vip' && <li>اضافه کردن مهمان</li>}
            </ul>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;