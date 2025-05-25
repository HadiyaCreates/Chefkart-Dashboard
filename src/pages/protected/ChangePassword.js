import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import ChangePassword from '../../features/settings/ChangePassword'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Edit Profile" }))
      }, [])


    return(
        <ChangePassword/>
    )
}

export default InternalPage