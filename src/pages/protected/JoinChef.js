import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import JoinChef from '../../features/leads copy 6/index copy 7'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "JoinChefBlog Management" }))
      }, [])


return(
        <JoinChef/>
    )
}

export default InternalPage