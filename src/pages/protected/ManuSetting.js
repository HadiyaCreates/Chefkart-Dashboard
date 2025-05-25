import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Manual from '../../features/settings/ManualSettiing'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Manually" }))
      }, [])


    return(
        <Manual />
    )
}

export default InternalPage