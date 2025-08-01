import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Fab,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  RestaurantMenu,
  CalendarToday,
  Image,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { Meal } from '../../types';

const FoodManagement: React.FC = () => {
  const { state, addMeal, updateMeal, deleteMeal } = useData();
  const [open, setOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    mealType: 'first' as 'first' | 'second' | 'custom',
    isActive: true,
  });

  const handleOpen = (meal?: Meal) => {
    if (meal) {
      setEditingMeal(meal);
      setFormData({
        name: meal.name,
        description: meal.description || '',
        image: meal.image || '',
        date: meal.date,
        mealType: meal.mealType,
        isActive: meal.isActive,
      });
    } else {
      setEditingMeal(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        mealType: 'first',
        isActive: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingMeal(null);
  };

  const handleSubmit = () => {
    if (editingMeal) {
      updateMeal(editingMeal.id, formData);
    } else {
      addMeal(formData);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این غذا اطمینان دارید؟')) {
      deleteMeal(id);
    }
  };

  const getMealTypeLabel = (type: string) => {
    switch (type) {
      case 'first':
        return 'غذای اول';
      case 'second':
        return 'غذای دوم';
      case 'custom':
        return 'سفارشی';
      default:
        return type;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
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
                  <RestaurantMenu sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    مدیریت غذا
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    اضافه کردن، ویرایش و حذف غذاهای روزانه
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleOpen()}
                sx={{
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  boxShadow: '0 4px 16px rgba(25,118,210,0.3)',
                }}
              >
                افزودن غذای جدید
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Meals Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
          <CardContent>
            <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تصویر</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نام غذا</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>توضیحات</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاریخ</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نوع غذا</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وضعیت</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {state.meals.map((meal, index) => (
                      <motion.tr
                        key={meal.id}
                        component={TableRow}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ delay: index * 0.1 }}
                        whileHover="hover"
                        sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}
                      >
                        <TableCell>
                          <Avatar
                            src={meal.image}
                            sx={{ width: 50, height: 50, borderRadius: 2 }}
                          >
                            <RestaurantMenu />
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {meal.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {meal.description || 'توضیحی ثبت نشده'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<CalendarToday />}
                            label={new Date(meal.date).toLocaleDateString('fa-IR')}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getMealTypeLabel(meal.mealType)}
                            color={meal.mealType === 'first' ? 'primary' : meal.mealType === 'second' ? 'secondary' : 'default'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={meal.isActive ? 'فعال' : 'غیرفعال'}
                            color={meal.isActive ? 'success' : 'default'}
                            size="small"
                            icon={meal.isActive ? <Visibility /> : <VisibilityOff />}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpen(meal)}
                              sx={{
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                },
                                transition: 'transform 0.2s',
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(meal.id)}
                              sx={{
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                },
                                transition: 'transform 0.2s',
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Box>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                  {state.meals.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          هنوز غذایی اضافه نشده است
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Add/Edit Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          },
        }}
      >
        <DialogTitle sx={{ bgcolor: 'primary.main', color: 'white', fontWeight: 'bold' }}>
          {editingMeal ? 'ویرایش غذا' : 'افزودن غذای جدید'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام غذا"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="تاریخ"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="توضیحات"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="آدرس تصویر"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                InputProps={{
                  startAdornment: <Image sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>نوع غذا</InputLabel>
                <Select
                  value={formData.mealType}
                  label="نوع غذا"
                  onChange={(e) => setFormData({ ...formData, mealType: e.target.value as any })}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="first">غذای اول</MenuItem>
                  <MenuItem value="second">غذای دوم</MenuItem>
                  <MenuItem value="custom">سفارشی</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    color="primary"
                  />
                }
                label="فعال"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleClose}
            sx={{ borderRadius: 2, px: 3 }}
          >
            انصراف
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {editingMeal ? 'ویرایش' : 'افزودن'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: '0 8px 32px rgba(25,118,210,0.4)',
        }}
        onClick={() => handleOpen()}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default FoodManagement;