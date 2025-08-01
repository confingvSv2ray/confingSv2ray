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
  SetMeal,
  CalendarToday,
  Image,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { SideDish } from '../../types';

const SideDishManagement: React.FC = () => {
  const { state, addSideDish, updateSideDish, deleteSideDish } = useData();
  const [open, setOpen] = useState(false);
  const [editingSideDish, setEditingSideDish] = useState<SideDish | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    date: new Date().toISOString().split('T')[0],
    isActive: true,
  });

  const handleOpen = (sideDish?: SideDish) => {
    if (sideDish) {
      setEditingSideDish(sideDish);
      setFormData({
        name: sideDish.name,
        description: sideDish.description || '',
        image: sideDish.image || '',
        date: sideDish.date,
        isActive: sideDish.isActive,
      });
    } else {
      setEditingSideDish(null);
      setFormData({
        name: '',
        description: '',
        image: '',
        date: new Date().toISOString().split('T')[0],
        isActive: true,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingSideDish(null);
  };

  const handleSubmit = () => {
    if (editingSideDish) {
      updateSideDish(editingSideDish.id, formData);
    } else {
      addSideDish(formData);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این غذای جانبی اطمینان دارید؟')) {
      deleteSideDish(id);
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
                    bgcolor: 'secondary.main',
                    mr: 2,
                    width: 56,
                    height: 56,
                  }}
                >
                  <SetMeal sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    مدیریت غذای جانبی
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    اضافه کردن، ویرایش و حذف غذاهای جانبی روزانه
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
                افزودن غذای جانبی جدید
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Side Dishes Table */}
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
                  <TableRow sx={{ bgcolor: 'secondary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تصویر</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نام غذای جانبی</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>توضیحات</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاریخ</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وضعیت</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {state.sideDishes.map((sideDish, index) => (
                      <motion.tr
                        key={sideDish.id}
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
                            src={sideDish.image}
                            sx={{ width: 50, height: 50, borderRadius: 2 }}
                          >
                            <SetMeal />
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {sideDish.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {sideDish.description || 'توضیحی ثبت نشده'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<CalendarToday />}
                            label={new Date(sideDish.date).toLocaleDateString('fa-IR')}
                            variant="outlined"
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={sideDish.isActive ? 'فعال' : 'غیرفعال'}
                            color={sideDish.isActive ? 'success' : 'default'}
                            size="small"
                            icon={sideDish.isActive ? <Visibility /> : <VisibilityOff />}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpen(sideDish)}
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
                              onClick={() => handleDelete(sideDish.id)}
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
                  {state.sideDishes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          هنوز غذای جانبی اضافه نشده است
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
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', fontWeight: 'bold' }}>
          {editingSideDish ? 'ویرایش غذای جانبی' : 'افزودن غذای جانبی جدید'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام غذای جانبی"
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
            <Grid item xs={12}>
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
            {editingSideDish ? 'ویرایش' : 'افزودن'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Floating Action Button */}
      <Fab
        color="secondary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          boxShadow: '0 8px 32px rgba(220,0,78,0.4)',
        }}
        onClick={() => handleOpen()}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default SideDishManagement;