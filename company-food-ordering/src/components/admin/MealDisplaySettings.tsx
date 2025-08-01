import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Slider,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import {
  Settings,
  Save,
  Refresh,
  AccessTime,
  ViewModule,
  Image as ImageIcon,
  Description,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const MealDisplaySettings: React.FC = () => {
  const { state, updateMealDisplaySettings } = useData();
  const { mealDisplaySettings } = state;
  const [settings, setSettings] = useState(mealDisplaySettings);

  const handleSave = () => {
    updateMealDisplaySettings(settings);
    alert('تنظیمات نمایش غذا با موفقیت ذخیره شد!');
  };

  const handleReset = () => {
    setSettings(mealDisplaySettings);
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
                    bgcolor: 'success.main',
                    mr: 2,
                    width: 56,
                    height: 56,
                  }}
                >
                  <Settings sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    تنظیمات نمایش غذا
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    پیکربندی نحوه نمایش منوها به کاربران
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 2 }}>
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
        {/* Menu Display Timing */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    زمان‌بندی نمایش منو
                  </Typography>
                </Box>
                
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>نمایش منوها</InputLabel>
                  <Select
                    value={settings.showMenuTiming}
                    label="نمایش منوها"
                    onChange={(e) => setSettings({ ...settings, showMenuTiming: e.target.value as any })}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="currentDay">فقط روز جاری</MenuItem>
                    <MenuItem value="wholeWeek">کل هفته</MenuItem>
                    <MenuItem value="custom">سفارشی</MenuItem>
                  </Select>
                </FormControl>

                <Typography gutterBottom sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                  مهلت ثبت سفارش (ساعت قبل از وعده غذا)
                </Typography>
                <Slider
                  value={settings.orderSubmissionDeadline}
                  onChange={(_, value) => setSettings({ ...settings, orderSubmissionDeadline: value as number })}
                  min={1}
                  max={24}
                  valueLabelDisplay="auto"
                  marks={[
                    { value: 1, label: '1 ساعت' },
                    { value: 6, label: '6 ساعت' },
                    { value: 12, label: '12 ساعت' },
                    { value: 24, label: '24 ساعت' },
                  ]}
                  sx={{ mt: 2 }}
                />

                <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
                  کاربران تا {settings.orderSubmissionDeadline} ساعت قبل از وعده غذا امکان ثبت یا تغییر سفارش دارند.
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Display Options */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ViewModule sx={{ mr: 2, color: 'secondary.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    گزینه‌های نمایش
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowMultipleSelections}
                        onChange={(e) => setSettings({ ...settings, allowMultipleSelections: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="امکان انتخاب چندین غذا در یک روز"
                    sx={{ mb: 2 }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.showMealImages}
                        onChange={(e) => setSettings({ ...settings, showMealImages: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="نمایش تصاویر غذاها"
                    sx={{ mb: 2 }}
                  />
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.showDescriptions}
                        onChange={(e) => setSettings({ ...settings, showDescriptions: e.target.checked })}
                        color="primary"
                      />
                    }
                    label="نمایش توضیحات غذاها"
                  />
                </Box>

                <Divider sx={{ my: 2 }} />

                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                  تغییر این تنظیمات بر تجربه کاربری تأثیر می‌گذارد. با دقت انتخاب کنید.
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Preview Section */}
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
                  <ImageIcon sx={{ mr: 2, color: 'success.main' }} />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    پیش‌نمایش تنظیمات
                  </Typography>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box
                      sx={{
                        p: 2,
                        border: '2px solid',
                        borderColor: settings.showMenuTiming === 'currentDay' ? 'primary.main' : 'grey.300',
                        borderRadius: 2,
                        textAlign: 'center',
                        bgcolor: settings.showMenuTiming === 'currentDay' ? 'primary.light' : 'grey.50',
                        color: settings.showMenuTiming === 'currentDay' ? 'primary.contrastText' : 'text.primary',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        نمایش منو
                      </Typography>
                      <Typography variant="caption">
                        {settings.showMenuTiming === 'currentDay' ? 'روز جاری' : 
                         settings.showMenuTiming === 'wholeWeek' ? 'کل هفته' : 'سفارشی'}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box
                      sx={{
                        p: 2,
                        border: '2px solid',
                        borderColor: settings.allowMultipleSelections ? 'secondary.main' : 'grey.300',
                        borderRadius: 2,
                        textAlign: 'center',
                        bgcolor: settings.allowMultipleSelections ? 'secondary.light' : 'grey.50',
                        color: settings.allowMultipleSelections ? 'secondary.contrastText' : 'text.primary',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        انتخاب چندگانه
                      </Typography>
                      <Typography variant="caption">
                        {settings.allowMultipleSelections ? 'فعال' : 'غیرفعال'}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box
                      sx={{
                        p: 2,
                        border: '2px solid',
                        borderColor: settings.showMealImages ? 'success.main' : 'grey.300',
                        borderRadius: 2,
                        textAlign: 'center',
                        bgcolor: settings.showMealImages ? 'success.light' : 'grey.50',
                        color: settings.showMealImages ? 'success.contrastText' : 'text.primary',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        تصاویر غذا
                      </Typography>
                      <Typography variant="caption">
                        {settings.showMealImages ? 'نمایش' : 'مخفی'}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box
                      sx={{
                        p: 2,
                        border: '2px solid',
                        borderColor: settings.showDescriptions ? 'warning.main' : 'grey.300',
                        borderRadius: 2,
                        textAlign: 'center',
                        bgcolor: settings.showDescriptions ? 'warning.light' : 'grey.50',
                        color: settings.showDescriptions ? 'warning.contrastText' : 'text.primary',
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        توضیحات
                      </Typography>
                      <Typography variant="caption">
                        {settings.showDescriptions ? 'نمایش' : 'مخفی'}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                  <Typography variant="body2" color="info.dark" sx={{ textAlign: 'center' }}>
                    مهلت ثبت سفارش: {settings.orderSubmissionDeadline} ساعت قبل از وعده غذا
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MealDisplaySettings;