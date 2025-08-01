import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  RestaurantMenu,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const { state } = useData();
  const { appearanceSettings } = state;
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    // Create floating particles for background animation
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await login(username, password);
      if (!success) {
        setError('نام کاربری یا کلمه عبور اشتباه است');
      }
    } catch (err) {
      setError('خطا در ورود به سیستم');
    } finally {
      setLoading(false);
    }
  };

  const getBackgroundStyle = () => {
    switch (appearanceSettings.backgroundType) {
      case 'solid':
        return { backgroundColor: appearanceSettings.backgroundColor };
      case 'image':
        return {
          backgroundImage: appearanceSettings.backgroundImage ? `url(${appearanceSettings.backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };
      default:
        return {
          background: `linear-gradient(135deg, ${appearanceSettings.primaryColor}20 0%, ${appearanceSettings.secondaryColor}20 100%)`,
        };
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
      z: -100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
    hover: {
      scale: 1.02,
      rotateY: 2,
      boxShadow: `0 20px 40px rgba(0,0,0,0.3)`,
      transition: {
        duration: 0.3,
      },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      opacity: [0.3, 0.8, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        ...getBackgroundStyle(),
      }}
    >
      {/* Animated Background Particles */}
      {appearanceSettings.animationType === '3d' && particles.map((particle) => (
        <motion.div
          key={particle.id}
          variants={particleVariants}
          animate="animate"
          style={{
            position: 'absolute',
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${appearanceSettings.primaryColor}, ${appearanceSettings.secondaryColor})`,
            pointerEvents: 'none',
          }}
          transition={{
            delay: particle.delay,
          }}
        />
      ))}

      <Container maxWidth="sm">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          style={{
            perspective: '1000px',
          }}
        >
          <Card
            sx={{
              borderRadius: `${appearanceSettings.borderRadius}px`,
              boxShadow: `0 ${appearanceSettings.shadowIntensity * 5}px ${appearanceSettings.shadowIntensity * 10}px rgba(0,0,0,0.${appearanceSettings.shadowIntensity})`,
              backdropFilter: 'blur(10px)',
              background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)`,
              overflow: 'visible',
              position: 'relative',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                {/* Logo */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 2,
                      background: `linear-gradient(45deg, ${appearanceSettings.primaryColor}, ${appearanceSettings.secondaryColor})`,
                      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                    }}
                    src={appearanceSettings.logoUrl}
                  >
                    {!appearanceSettings.logoUrl && <RestaurantMenu sx={{ fontSize: 40 }} />}
                  </Avatar>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: appearanceSettings.primaryColor,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    {appearanceSettings.loginTitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                  >
                    {appearanceSettings.loginSubtitle}
                  </Typography>
                </motion.div>
              </Box>

              <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  whileFocus="focus"
                >
                  <TextField
                    fullWidth
                    label={appearanceSettings.usernameLabel}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    required
                    autoFocus
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: `${appearanceSettings.borderRadius / 2}px`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        },
                        transition: 'all 0.3s ease',
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  whileFocus="focus"
                  transition={{ delay: 0.1 }}
                >
                  <TextField
                    fullWidth
                    label={appearanceSettings.passwordLabel}
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: `${appearanceSettings.borderRadius / 2}px`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                        },
                        transition: 'all 0.3s ease',
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 1.5,
                      borderRadius: `${appearanceSettings.borderRadius / 2}px`,
                      background: `linear-gradient(45deg, ${appearanceSettings.primaryColor}, ${appearanceSettings.secondaryColor})`,
                      boxShadow: `0 ${appearanceSettings.shadowIntensity * 2}px ${appearanceSettings.shadowIntensity * 4}px rgba(0,0,0,0.${appearanceSettings.shadowIntensity})`,
                      '&:hover': {
                        background: `linear-gradient(45deg, ${appearanceSettings.secondaryColor}, ${appearanceSettings.primaryColor})`,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 ${appearanceSettings.shadowIntensity * 3}px ${appearanceSettings.shadowIntensity * 6}px rgba(0,0,0,0.${appearanceSettings.shadowIntensity + 1})`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {loading ? 'در حال ورود...' : appearanceSettings.loginButtonText}
                  </Button>
                </motion.div>
              </Box>

              {/* Demo Credentials Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    borderRadius: 2,
                    background: 'rgba(25, 118, 210, 0.1)',
                    border: '1px solid rgba(25, 118, 210, 0.2)',
                  }}
                >
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    اطلاعات ورود آزمایشی:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    نام کاربری: admin
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    کلمه عبور: admin123
                  </Typography>
                </Box>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;