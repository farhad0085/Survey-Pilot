import {
  DashboardOutlined,
  LoginOutlined,
  ProfileOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  ChromeOutlined,
  QuestionOutlined
} from '@ant-design/icons';


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
          url: '/login',
          icon: LoginOutlined,
          target: true
        },
        {
          id: 'register1',
          title: 'Register',
          type: 'item',
          url: '/register',
          icon: ProfileOutlined,
          target: true
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
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          url: 'https://codedthemes.gitbook.io/mantis/',
          icon: QuestionOutlined,
          external: true,
          target: true
        }
      ]
    }
  ]
}

export default menuItems;
