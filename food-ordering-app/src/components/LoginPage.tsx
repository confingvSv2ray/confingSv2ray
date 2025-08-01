import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  CircularProgress,
  Fade,
  Zoom,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useApp } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const { appearanceSettings } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const getInputStyle = () => {
    switch (appearanceSettings.inputStyle) {
      case 'glassmorphism':
        return {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '15px',
            '& fieldset': {
              border: 'none',
            },
            '&:hover fieldset': {
              border: 'none',
            },
            '&.Mui-focused fieldset': {
              border: '2px solid rgba(255, 255, 255, 0.3)',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'rgba(255, 255, 255, 0.8)',
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
        };
      case 'neon':
        return {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '10px',
            '& fieldset': {
              borderColor: appearanceSettings.primaryColor,
              borderWidth: '2px',
              boxShadow: `0 0 10px ${appearanceSettings.primaryColor}`,
            },
            '&:hover fieldset': {
              borderColor: appearanceSettings.secondaryColor,
              boxShadow: `0 0 15px ${appearanceSettings.secondaryColor}`,
            },
            '&.Mui-focused fieldset': {
              borderColor: appearanceSettings.primaryColor,
              boxShadow: `0 0 20px ${appearanceSettings.primaryColor}`,
            },
          },
          '& .MuiInputLabel-root': {
            color: appearanceSettings.primaryColor,
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
        };
      default:
        return {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
          },
        };
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: appearanceSettings.loginPageBackground,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        direction: 'rtl',
        fontFamily: 'Vazir, Arial, sans-serif',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card
            sx={{
              borderRadius: 4,
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                {appearanceSettings.logoUrl && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  >
                    <Avatar
                      src={appearanceSettings.logoUrl}
                      sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                    />
                  </motion.div>
                )}
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 1,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {appearanceSettings.loginTitle}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {appearanceSettings.loginSubtitle}
                  </Typography>
                </motion.div>
              </Box>

              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="نام کاربری"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    sx={getInputStyle()}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    type="password"
                    label="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={getInputStyle()}
                  />
                </Box>

                {error && (
                  <Fade in={!!error}>
                    <Typography
                      color="error"
                      sx={{
                        mb: 2,
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        padding: 1,
                        borderRadius: 2,
                        border: '1px solid rgba(255, 0, 0, 0.3)',
                      }}
                    >
                      {error}
                    </Typography>
                  </Fade>
                )}

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      py: 2,
                      borderRadius: 3,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      background: `linear-gradient(45deg, ${appearanceSettings.primaryColor}, ${appearanceSettings.secondaryColor})`,
                      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.3)`,
                      '&:hover': {
                        boxShadow: `0 6px 25px rgba(0, 0, 0, 0.4)`,
                      },
                      '&:disabled': {
                        opacity: 0.7,
                      },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'ورود'
                    )}
                  </Button>
                </motion.div>
              </motion.form>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.9rem',
                  }}
                >
                  حساب‌های آزمایشی:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.8rem',
                    mt: 1,
                  }}
                >
                  مدیر: admin/admin123 | آشپز: chef/chef123
                  <br />
                  کاربر عادی: user1/user123 | کاربر ویژه: vip1/vip123
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default LoginPage;