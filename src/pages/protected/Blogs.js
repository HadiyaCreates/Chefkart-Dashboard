import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Blog from '../../features/leads copy 6/index copy'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Blog Management" }))
      }, [])


return(
        <Blog/>
    )
}

export default InternalPage