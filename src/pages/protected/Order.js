
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OrderList from '../../features/leads copy 7'
import { useEffect } from 'react'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Services" }))
      }, [])


    return(
        <OrderList />
    )
}

export default InternalPage