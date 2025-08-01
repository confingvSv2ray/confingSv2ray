import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  RestaurantMenu,
  People,
  ShoppingCart,
  TrendingUp,
  CalendarToday,
  Person,
  CheckCircle,
  PendingActions,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useData } from '../../context/DataContext';

const Dashboard: React.FC = () => {
  const { state } = useData();
  const { users, meals, orders } = state;

  // Calculate statistics
  const totalUsers = users.length;
  const totalMeals = meals.length;
  const totalOrders = orders.length;
  const todaysOrders = orders.filter(order => 
    new Date(order.submittedAt).toDateString() === new Date().toDateString()
  ).length;

  const usersByRole = {
    admin: users.filter(u => u.role === 'admin').length,
    regular: users.filter(u => u.role === 'regular').length,
    vip: users.filter(u => u.role === 'vip').length,
    chef: users.filter(u => u.role === 'chef').length,
  };

  const recentOrders = orders
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    change?: string;
  }> = ({ title, value, icon, color, change }) => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.02 }}
    >
      <Card sx={{ 
        borderRadius: 3, 
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        background: `linear-gradient(135deg, ${color}10, ${color}05)`,
        border: `1px solid ${color}20`,
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color, mb: 1 }}>
                {value}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {title}
              </Typography>
              {change && (
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TrendingUp sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                  <Typography variant="body2" color="success.main">
                    {change}
                  </Typography>
                </Box>
              )}
            </Box>
            <Avatar
              sx={{
                bgcolor: color,
                width: 56,
                height: 56,
                boxShadow: `0 4px 16px ${color}40`,
              }}
            >
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  mr: 2,
                  width: 56,
                  height: 56,
                }}
              >
                <DashboardIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                  داشبورد مدیریت
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  خوش آمدید! خلاصه‌ای از وضعیت سیستم را در زیر مشاهده کنید
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="تعداد کاربران"
            value={totalUsers}
            icon={<People />}
            color="#1976d2"
            change="+12% نسبت به ماه گذشته"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="تعداد غذاها"
            value={totalMeals}
            icon={<RestaurantMenu />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="سفارشات امروز"
            value={todaysOrders}
            icon={<ShoppingCart />}
            color="#ed6c02"
            change="+8% نسبت به دیروز"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="کل سفارشات"
            value={totalOrders}
            icon={<CheckCircle />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* User Distribution */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  توزیع کاربران بر اساس نقش
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">مدیران</Typography>
                    <Typography variant="body2">{usersByRole.admin}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(usersByRole.admin / totalUsers) * 100}
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">کاربران عادی</Typography>
                    <Typography variant="body2">{usersByRole.regular}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(usersByRole.regular / totalUsers) * 100}
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    color="secondary"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">کاربران VIP</Typography>
                    <Typography variant="body2">{usersByRole.vip}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(usersByRole.vip / totalUsers) * 100}
                    sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    color="success"
                  />
                </Box>

                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">آشپزها</Typography>
                    <Typography variant="body2">{usersByRole.chef}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(usersByRole.chef / totalUsers) * 100}
                    sx={{ height: 8, borderRadius: 4 }}
                    color="warning"
                  />
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)', height: '100%' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  آخرین سفارشات
                </Typography>
                
                <List sx={{ p: 0 }}>
                  {recentOrders.length > 0 ? recentOrders.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem
                        sx={{
                          border: '1px solid #f0f0f0',
                          borderRadius: 2,
                          mb: 1,
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.02)',
                          },
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <Person />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={order.userName}
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary">
                                {order.mealName || 'غذای انتخابی'}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(order.submittedAt).toLocaleDateString('fa-IR')}
                              </Typography>
                            </Box>
                          }
                        />
                        <Chip
                          label={order.isLocked ? 'تایید شده' : 'در انتظار'}
                          color={order.isLocked ? 'success' : 'warning'}
                          size="small"
                        />
                      </ListItem>
                    </motion.div>
                  )) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        هنوز سفارشی ثبت نشده است
                      </Typography>
                    </Box>
                  )}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Today's Menu */}
        <Grid item xs={12}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  منوی امروز
                </Typography>
                
                <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: 'primary.main' }}>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نام غذا</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>نوع</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>توضیحات</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>وضعیت</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {meals
                        .filter(meal => meal.date === new Date().toISOString().split('T')[0] && meal.isActive)
                        .map((meal) => (
                          <TableRow key={meal.id} sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}>
                            <TableCell>
                              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                {meal.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={meal.mealType === 'first' ? 'غذای اول' : meal.mealType === 'second' ? 'غذای دوم' : 'سفارشی'}
                                color={meal.mealType === 'first' ? 'primary' : meal.mealType === 'second' ? 'secondary' : 'default'}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {meal.description || 'توضیحی ندارد'}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label="فعال"
                                color="success"
                                size="small"
                                icon={<CheckCircle />}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      {meals.filter(meal => meal.date === new Date().toISOString().split('T')[0] && meal.isActive).length === 0 && (
                        <TableRow>
                          <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                              برای امروز غذایی تعریف نشده است
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;