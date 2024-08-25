import {
  DashboardOutlined,
  BarsOutlined,
  PlusOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  ChromeOutlined,
} from '@ant-design/icons';
import { CREATE_POLL_PAGE, LIST_POLL_PAGE } from 'routes/urls';


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
          url: '/dashboard/home',
          icon: DashboardOutlined,
          breadcrumbs: false,
          showBreadcrumbTitle: true
        }
      ]
    },
    {
      id: 'poll',
      title: 'Poll',
      type: 'group',
      children: [
        {
          id: 'list-poll',
          title: 'Polls',
          type: 'item',
          url: LIST_POLL_PAGE,
          icon: BarsOutlined,
          showBreadcrumbTitle: false
        },
        {
          id: 'create-poll',
          title: 'Create new poll',
          type: 'item',
          url: CREATE_POLL_PAGE,
          icon: PlusOutlined,
          showBreadcrumbTitle: false
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
          icon: FontSizeOutlined,
          showBreadcrumbTitle: true
        },
        {
          id: 'util-color',
          title: 'Color',
          type: 'item',
          url: '/dashboard/color',
          icon: BgColorsOutlined,
          showBreadcrumbTitle: true
        },
        {
          id: 'util-shadow',
          title: 'Shadow',
          type: 'item',
          url: '/dashboard/shadow',
          icon: BarcodeOutlined,
          showBreadcrumbTitle: true
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
          icon: ChromeOutlined,
          showBreadcrumbTitle: true
        },
      ]
    }
  ]
}

export default menuItems;
