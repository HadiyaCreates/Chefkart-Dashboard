import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import ChefDetails from '../../features/leads copy 6/index copy 6'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "ChefDetails Management" }))
      }, [])


return(
        <ChefDetails/>
    )
}

export default InternalPage