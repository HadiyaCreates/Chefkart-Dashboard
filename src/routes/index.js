// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))


const Gallery=lazy(()=>import('../pages/protected/Gallery1'));
const  Testimonial=lazy(()=>import('../pages/protected/Testimonial'));
const Blog=lazy(()=>import('../pages/protected/Blogs'))
const JoinChef=lazy(()=>import('../pages/protected/JoinChef'))
const Crousel=lazy(()=>import('../pages/protected/Crousel'))
const Service=lazy(()=>import('../pages/protected/Service'))
const Chef=lazy(()=>import('../pages/protected/ChefDetails'))
const Investor=lazy(()=>import('../pages/protected/Investor'))
const Homepage=lazy(()=>import('../pages/protected/Home'))
const ImagGallery=lazy(()=>import('../pages/protected/ImageGallery'))

const routes = [
  { // the url
  component: Dashboard, // view rendered
  },
  


  {
    path: '/Home',
    component:Homepage,
  },
  {
    path: '/ImageGallery',
    component:ImagGallery,
  },
  {
    path: '/Blog',
    component:Blog,
  },
  
  

  {
    path: '/Gallery',
    component: Gallery,
  },
  {
    path: '/testimonial',
    component: Testimonial,
  },

  {
    path: '/crousel',
    component: Crousel,
  },

  {
    path: '/Chef',
    component: Chef,
  },
  {
    path: '/joinChef',
    component:JoinChef,
  },
  

  {
    path: '/User',
    component: Crousel,
  },
  {
    path: '/Service',
    component: Service,
  },

  {
    path: '/investor',
    component: Investor,
  },
  {
    path: '/booking',
    component: Crousel,
  },
 
  

  
]

export default routes
