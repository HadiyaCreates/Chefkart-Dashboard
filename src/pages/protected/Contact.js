
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

import { useEffect } from 'react'
import ContactList from '../../features/leads copy 7/index copy'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Contact" }))
      }, [])


    return(
        <ContactList />
    )
}

export default InternalPage