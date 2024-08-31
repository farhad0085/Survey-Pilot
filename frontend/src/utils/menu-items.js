import {
  DashboardOutlined,
  BarsOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import * as URLS from 'routes/urls';


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
          url: URLS.DASHBOARD_HOME_PAGE,
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
          url: URLS.LIST_POLL_PAGE,
          icon: BarsOutlined,
          showBreadcrumbTitle: false
        },
        {
          id: 'create-poll',
          title: 'Create new poll',
          type: 'item',
          url: URLS.CREATE_POLL_PAGE,
          icon: PlusOutlined,
          showBreadcrumbTitle: false
        }
      ]
    },
    {
      id: 'survey',
      title: 'Survey',
      type: 'group',
      children: [
        {
          id: 'list-survey',
          title: 'Surveys',
          type: 'item',
          url: URLS.LIST_SURVEY_PAGE,
          icon: BarsOutlined,
          showBreadcrumbTitle: false
        },
        {
          id: 'create-survey',
          title: 'Create new survey',
          type: 'item',
          url: URLS.CREATE_SURVEY_PAGE,
          icon: PlusOutlined,
          showBreadcrumbTitle: false
        }
      ]
    },
  ]
}

export default menuItems;
