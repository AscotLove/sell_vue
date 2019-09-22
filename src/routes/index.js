import Msite from '../pages/Msite/Msite';
import Order from '../pages/Order/Order';
import Profile from '../pages/Profile/Profile';
import Search from '../pages/Search/Search';


  const routes = [
    {
      path: "/Msite",
      component: Msite,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: "/Order",
      component: Order,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: "/Profile",
      component: Profile,
      meta: {
        showFooterGuide: true
      }
    },
    {
      path: "/Search",
      component: Search,
      meta: {
        showFooterGuide: true
      }
    },

    {
      path: "/",
      redirect: "/Msite",
      meta: {
        showFooterGuide: true
      }
    },
    ]

export default routes