import {
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  ChromeOutlined,
} from '@ant-design/icons';
import { LOGIN_PAGE, REGISTER_PAGE } from 'routes/urls';


// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    {
      id: 'group-dashboard',
      title: 'Navigation',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/dashboard',
          icon: DashboardOutlined,
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'authentication',
      title: 'Authentication',
      type: 'group',
      children: [
        {
          id: 'login1',
          title: 'Login',
          type: 'item',
          url: LOGIN_PAGE,
          icon: LoginOutlined,
          target: false
        },
        {
          id: 'register1',
          title: 'Register',
          type: 'item',
          url: REGISTER_PAGE,
          icon: ProfileOutlined,
          target: false
        }
      ]
    },
    {
      id: 'utilities',
      title: 'Utilities',
      type: 'group',
      children: [
        {
          id: 'util-typography',
          title: 'Typography',
          type: 'item',
          url: '/dashboard/typography',
          icon: FontSizeOutlined
        },
        {
          id: 'util-color',
          title: 'Color',
          type: 'item',
          url: '/dashboard/color',
          icon: BgColorsOutlined
        },
        {
          id: 'util-shadow',
          title: 'Shadow',
          type: 'item',
          url: '/dashboard/shadow',
          icon: BarcodeOutlined
        }
      ]
    },
    {
      id: 'support',
      title: 'Support',
      type: 'group',
      children: [
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/dashboard/sample-page',
          icon: ChromeOutlined
        },
      ]
    }
  ]
}

export default menuItems;
