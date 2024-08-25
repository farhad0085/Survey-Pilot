import Box from '@mui/material/Box';
import NavGroup from './NavGroup';
import menuItems from 'utils/menu-items';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

export default function Navigation() {

  return (
    <Box sx={{ pt: 2 }}>
      {menuItems?.items?.map((item) => <NavGroup key={item.id} item={item} />)}
    </Box>
  );
}
