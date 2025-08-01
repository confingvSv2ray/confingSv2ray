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
  People,
  Person,
  AdminPanelSettings,
  Restaurant,
  Star,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../../context/DataContext';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const { state, addUser, updateUser, deleteUser } = useData();
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    role: 'regular' as 'admin' | 'regular' | 'chef' | 'vip',
  });

  const handleOpen = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        username: user.username,
        password: '', // Don't show password for security
        fullName: user.fullName,
        email: user.email || '',
        role: user.role,
      });
    } else {
      setEditingUser(null);
      setFormData({
        username: '',
        password: '',
        fullName: '',
        email: '',
        role: 'regular',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingUser(null);
  };

  const handleSubmit = () => {
    if (editingUser) {
      // If password is empty, keep the existing password
      const updateData = formData.password 
        ? formData 
        : { ...formData, password: editingUser.password };
      updateUser(editingUser.id, updateData);
    } else {
      addUser(formData);
    }
    handleClose();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
      deleteUser(id);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <AdminPanelSettings />;
      case 'chef':
        return <Restaurant />;
      case 'vip':
        return <Star />;
      default:
        return <Person />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'مدیر';
      case 'chef':
        return 'آشپز';
      case 'vip':
        return 'کاربر VIP';
      case 'regular':
        return 'کاربر عادی';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'chef':
        return 'warning';
      case 'vip':
        return 'success';
      default:
        return 'primary';
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
                  <People sx={{ fontSize: 30 }} />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    مدیریت کاربران
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    اضافه کردن، ویرایش و مدیریت کاربران سیستم
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
                افزودن کاربر جدید
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
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
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>آواتار</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نام کامل</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نام کاربری</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ایمیل</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نقش</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>تاریخ ایجاد</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>عملیات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <AnimatePresence>
                    {state.users.map((user, index) => (
                      <motion.tr
                        key={user.id}
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
                            sx={{
                              bgcolor: getRoleColor(user.role) + '.main',
                              width: 50,
                              height: 50,
                            }}
                          >
                            {getRoleIcon(user.role)}
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {user.fullName}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.username}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {user.email || 'ثبت نشده'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={getRoleLabel(user.role)}
                            color={getRoleColor(user.role) as any}
                            size="small"
                            icon={getRoleIcon(user.role)}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(user.createdAt).toLocaleDateString('fa-IR')}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpen(user)}
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
                              onClick={() => handleDelete(user.id)}
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
                  {state.users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          هنوز کاربری اضافه نشده است
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
          {editingUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام کامل"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="نام کاربری"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label={editingUser ? 'کلمه عبور (خالی بگذارید تا تغییر نکند)' : 'کلمه عبور'}
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required={!editingUser}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="ایمیل"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>نقش کاربر</InputLabel>
                <Select
                  value={formData.role}
                  label="نقش کاربر"
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="regular">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Person sx={{ mr: 1 }} />
                      کاربر عادی
                    </Box>
                  </MenuItem>
                  <MenuItem value="vip">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Star sx={{ mr: 1 }} />
                      کاربر VIP
                    </Box>
                  </MenuItem>
                  <MenuItem value="chef">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Restaurant sx={{ mr: 1 }} />
                      آشپز
                    </Box>
                  </MenuItem>
                  <MenuItem value="admin">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AdminPanelSettings sx={{ mr: 1 }} />
                      مدیر
                    </Box>
                  </MenuItem>
                </Select>
              </FormControl>
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
            disabled={!formData.fullName || !formData.username || (!editingUser && !formData.password)}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {editingUser ? 'ویرایش' : 'افزودن'}
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

export default UserManagement;