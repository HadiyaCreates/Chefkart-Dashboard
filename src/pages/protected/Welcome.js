import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import {Link, useNavigate} from 'react-router-dom'
import TemplatePointers from '../../features/user/components/TemplatePointers'

function InternalPage(){

 

  return (
      <div className="hero h-4/5 bg-base-200">
          <div className="hero-content">
              <div className="max-w-md">
                
                  <button className="btn bg-base-100 btn-outline">Welcome to the Chefkart</button>
              </div>
          </div>
      </div>
  );
}

export default InternalPage