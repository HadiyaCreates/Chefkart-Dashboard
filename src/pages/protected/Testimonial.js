import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import Testimonial from '../../features/leads copy 6/index copy 4'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Testimonial Management" }))
      }, [])


return(
        <Testimonial/>
    )
}

export default InternalPage