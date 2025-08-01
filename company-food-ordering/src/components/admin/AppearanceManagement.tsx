import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Switch,
  FormControlLabel,
  Avatar,
  Paper,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  Palette,
  Upload,
  Preview,
  Save,
  Refresh,
  ColorLens,
  Brush,
  Style,
  Photo,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { SketchPicker } from 'react-color';
import { useData } from '../../context/DataContext';
import Login from '../Login';

const AppearanceManagement: React.FC = () => {
  const { state, updateAppearanceSettings } = useData();
  const { appearanceSettings } = state;
  const [settings, setSettings] = useState(appearanceSettings);
  const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
  const [showSecondaryColorPicker, setShowSecondaryColorPicker] = useState(false);
  const [showBackgroundColorPicker, setShowBackgroundColorPicker] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = () => {
    updateAppearanceSettings(settings);
    alert('تنظیمات ظاهر با موفقیت ذخیره شد!');
  };

  const handleReset = () => {
    setSettings(appearanceSettings);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (settings.backgroundType === 'image') {
          setSettings({ ...settings, backgroundImage: result });
        } else {
          setSettings({ ...settings, logoUrl: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const colorPickerStyle = {
    position: 'absolute' as const,
    zIndex: 1000,
    top: '100%',
    right: 0,
    marginTop: '8px',
    borderRadius: '8px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box>
      {/* Header */}
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: 'primary.main',
                    mr: 2,
                    width: 56,
                    height: 56,
                  }}
                >
                  <Palette sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    مدیریت ظاهر
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    تنظیمات رنگ، طراحی و انیمیشن صفحه ورود
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Preview />}
                  onClick={() => setPreviewMode(!previewMode)}
                  sx={{ borderRadius: 2 }}
                >
                  {previewMode ? 'بستن پیش‌نمایش' : 'پیش‌نمایش زنده'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Refresh />}
                  onClick={handleReset}
                  sx={{ borderRadius: 2 }}
                >
                  بازنشانی
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSave}
                  sx={{ borderRadius: 2 }}
                >
                  ذخیره تغییرات
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      <Grid container spacing={3}>
        {/* Settings Panel */}
        <Grid item xs={12} lg={previewMode ? 6 : 12}>
          <Grid container spacing={3}>
            {/* Color Settings */}
            <Grid item xs={12}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <ColorLens sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        تنظیمات رنگ
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'relative' }}>
                          <TextField
                            fullWidth
                            label="رنگ اصلی"
                            value={settings.primaryColor}
                            onChange={(e) => setSettings({ ...settings, primaryColor: e.target.value })}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPrimaryColorPicker(!showPrimaryColorPicker)}
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      bgcolor: settings.primaryColor,
                                      border: '2px solid #ccc',
                                      '&:hover': { bgcolor: settings.primaryColor },
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                          />
                          {showPrimaryColorPicker && (
                            <Box sx={colorPickerStyle}>
                              <SketchPicker
                                color={settings.primaryColor}
                                onChange={(color) => setSettings({ ...settings, primaryColor: color.hex })}
                                onChangeComplete={() => setShowPrimaryColorPicker(false)}
                              />
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'relative' }}>
                          <TextField
                            fullWidth
                            label="رنگ فرعی"
                            value={settings.secondaryColor}
                            onChange={(e) => setSettings({ ...settings, secondaryColor: e.target.value })}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowSecondaryColorPicker(!showSecondaryColorPicker)}
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      bgcolor: settings.secondaryColor,
                                      border: '2px solid #ccc',
                                      '&:hover': { bgcolor: settings.secondaryColor },
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                          />
                          {showSecondaryColorPicker && (
                            <Box sx={colorPickerStyle}>
                              <SketchPicker
                                color={settings.secondaryColor}
                                onChange={(color) => setSettings({ ...settings, secondaryColor: color.hex })}
                                onChangeComplete={() => setShowSecondaryColorPicker(false)}
                              />
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Box sx={{ position: 'relative' }}>
                          <TextField
                            fullWidth
                            label="رنگ پس‌زمینه"
                            value={settings.backgroundColor}
                            onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowBackgroundColorPicker(!showBackgroundColorPicker)}
                                    sx={{
                                      width: 30,
                                      height: 30,
                                      bgcolor: settings.backgroundColor,
                                      border: '2px solid #ccc',
                                      '&:hover': { bgcolor: settings.backgroundColor },
                                    }}
                                  />
                                </InputAdornment>
                              ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                          />
                          {showBackgroundColorPicker && (
                            <Box sx={colorPickerStyle}>
                              <SketchPicker
                                color={settings.backgroundColor}
                                onChange={(color) => setSettings({ ...settings, backgroundColor: color.hex })}
                                onChangeComplete={() => setShowBackgroundColorPicker(false)}
                              />
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Background Settings */}
            <Grid item xs={12}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Photo sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        تنظیمات پس‌زمینه
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>نوع پس‌زمینه</InputLabel>
                          <Select
                            value={settings.backgroundType}
                            label="نوع پس‌زمینه"
                            onChange={(e) => setSettings({ ...settings, backgroundType: e.target.value as any })}
                            sx={{ borderRadius: 2 }}
                          >
                            <MenuItem value="gradient">گرادیان</MenuItem>
                            <MenuItem value="solid">رنگ ثابت</MenuItem>
                            <MenuItem value="image">تصویر</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      {settings.backgroundType === 'image' && (
                        <Grid item xs={12} md={6}>
                          <Button
                            variant="outlined"
                            component="label"
                            startIcon={<Upload />}
                            fullWidth
                            sx={{ height: '56px', borderRadius: 2 }}
                          >
                            آپلود تصویر پس‌زمینه
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Logo and Text Settings */}
            <Grid item xs={12}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Style sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        تنظیمات متن و لوگو
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<Upload />}
                          fullWidth
                          sx={{ mb: 2, borderRadius: 2 }}
                        >
                          آپلود لوگو
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleImageUpload}
                          />
                        </Button>
                        {settings.logoUrl && (
                          <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <img
                              src={settings.logoUrl}
                              alt="Logo Preview"
                              style={{ maxWidth: '100px', maxHeight: '100px', borderRadius: '8px' }}
                            />
                          </Box>
                        )}
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="عنوان صفحه ورود"
                          value={settings.loginTitle}
                          onChange={(e) => setSettings({ ...settings, loginTitle: e.target.value })}
                          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                        <TextField
                          fullWidth
                          label="زیرعنوان"
                          value={settings.loginSubtitle}
                          onChange={(e) => setSettings({ ...settings, loginSubtitle: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="برچسب نام کاربری"
                          value={settings.usernameLabel}
                          onChange={(e) => setSettings({ ...settings, usernameLabel: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="برچسب کلمه عبور"
                          value={settings.passwordLabel}
                          onChange={(e) => setSettings({ ...settings, passwordLabel: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <TextField
                          fullWidth
                          label="متن دکمه ورود"
                          value={settings.loginButtonText}
                          onChange={(e) => setSettings({ ...settings, loginButtonText: e.target.value })}
                          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Design Settings */}
            <Grid item xs={12}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.4 }}
              >
                <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Brush sx={{ mr: 2, color: 'primary.main' }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        تنظیمات طراحی
                      </Typography>
                    </Box>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>نوع انیمیشن</InputLabel>
                          <Select
                            value={settings.animationType}
                            label="نوع انیمیشن"
                            onChange={(e) => setSettings({ ...settings, animationType: e.target.value as any })}
                            sx={{ borderRadius: 2 }}
                          >
                            <MenuItem value="2d">دوبعدی (2D)</MenuItem>
                            <MenuItem value="3d">سه‌بعدی (3D)</MenuItem>
                            <MenuItem value="5d">پنج‌بعدی (5D)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography gutterBottom>شعاع گوشه‌ها</Typography>
                        <Slider
                          value={settings.borderRadius}
                          onChange={(_, value) => setSettings({ ...settings, borderRadius: value as number })}
                          min={0}
                          max={30}
                          valueLabelDisplay="auto"
                          sx={{ mb: 2 }}
                        />
                      </Grid>
                      
                      <Grid item xs={12} md={6}>
                        <Typography gutterBottom>شدت سایه</Typography>
                        <Slider
                          value={settings.shadowIntensity}
                          onChange={(_, value) => setSettings({ ...settings, shadowIntensity: value as number })}
                          min={1}
                          max={10}
                          valueLabelDisplay="auto"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Live Preview */}
        {previewMode && (
          <Grid item xs={12} lg={6}>
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.1 }}
            >
              <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', position: 'sticky', top: 24 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    پیش‌نمایش زنده
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Box
                    sx={{
                      border: '2px solid #ddd',
                      borderRadius: 2,
                      overflow: 'hidden',
                      height: '600px',
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        transform: 'scale(0.7)',
                        transformOrigin: 'top left',
                        width: '142.857%',
                        height: '142.857%',
                      }}
                    >
                      {/* Pass the temporary settings to a mock login component */}
                      <div style={{ pointerEvents: 'none' }}>
                        {/* We'll simulate the login preview here */}
                        <Box
                          sx={{
                            minHeight: '100vh',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: settings.backgroundType === 'gradient' 
                              ? `linear-gradient(135deg, ${settings.primaryColor}20 0%, ${settings.secondaryColor}20 100%)`
                              : settings.backgroundType === 'solid'
                              ? settings.backgroundColor
                              : settings.backgroundImage 
                              ? `url(${settings.backgroundImage})`
                              : `linear-gradient(135deg, ${settings.primaryColor}20 0%, ${settings.secondaryColor}20 100%)`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        >
                          <Paper
                            sx={{
                              p: 4,
                              maxWidth: 400,
                              width: '100%',
                              borderRadius: `${settings.borderRadius}px`,
                              boxShadow: `0 ${settings.shadowIntensity * 5}px ${settings.shadowIntensity * 10}px rgba(0,0,0,0.${settings.shadowIntensity})`,
                              textAlign: 'center',
                            }}
                          >
                            <Avatar
                              sx={{
                                width: 80,
                                height: 80,
                                mx: 'auto',
                                mb: 2,
                                background: `linear-gradient(45deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                              }}
                              src={settings.logoUrl}
                            />
                            <Typography variant="h4" sx={{ mb: 1, color: settings.primaryColor, fontWeight: 'bold' }}>
                              {settings.loginTitle}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                              {settings.loginSubtitle}
                            </Typography>
                            <TextField
                              fullWidth
                              label={settings.usernameLabel}
                              sx={{
                                mb: 2,
                                '& .MuiOutlinedInput-root': { borderRadius: `${settings.borderRadius / 2}px` },
                              }}
                            />
                            <TextField
                              fullWidth
                              label={settings.passwordLabel}
                              type="password"
                              sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': { borderRadius: `${settings.borderRadius / 2}px` },
                              }}
                            />
                            <Button
                              fullWidth
                              variant="contained"
                              size="large"
                              sx={{
                                py: 1.5,
                                borderRadius: `${settings.borderRadius / 2}px`,
                                background: `linear-gradient(45deg, ${settings.primaryColor}, ${settings.secondaryColor})`,
                                boxShadow: `0 ${settings.shadowIntensity * 2}px ${settings.shadowIntensity * 4}px rgba(0,0,0,0.${settings.shadowIntensity})`,
                              }}
                            >
                              {settings.loginButtonText}
                            </Button>
                          </Paper>
                        </Box>
                      </div>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AppearanceManagement;