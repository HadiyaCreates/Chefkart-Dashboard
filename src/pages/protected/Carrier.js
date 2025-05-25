import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import CarrierAccounting from '../../features/leads copy 9'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Carrier" }))
      }, [])


return(
        <CarrierAccounting/>
    )
}

export default InternalPage