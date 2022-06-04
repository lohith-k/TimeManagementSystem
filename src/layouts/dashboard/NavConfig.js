// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
 /* {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  }, */
  {
    title: 'timer',
    path: '/dashboard/timer',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'tasks',
    path: '/dashboard/tasks',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'timesheet',
    path: '/dashboard/timesheet',
    
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'calendar',
    path: '/calendar',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'logout',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
  /* {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: getIcon('eva:file-text-fill'),
  },
  
  {
    title: 'register',
    path: '/register',
    icon: getIcon('eva:person-add-fill'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: getIcon('eva:alert-triangle-fill'),
  }, */
];

export default navConfig;
