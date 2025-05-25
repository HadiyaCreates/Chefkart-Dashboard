import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'


import ImageGallery from '../../features/leads copy 6/index copy 9'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "ImageGallery Management" }))
      }, [])


return(
        <ImageGallery/>
    )
}

export default InternalPage