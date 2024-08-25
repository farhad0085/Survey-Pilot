import {
  DashboardOutlined,
  BarsOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { CREATE_POLL_PAGE, DASHBOARD_HOME_PAGE, LIST_POLL_PAGE } from 'routes/urls';


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
          url: DASHBOARD_HOME_PAGE,
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
  ]
}

export default menuItems;
