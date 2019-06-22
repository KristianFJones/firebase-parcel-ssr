import React from 'react'
import { useTitle } from '~/components/HeadProvider'
import { titleStyle, bodyStyle } from '~/components/styles'
import { FirebaseRoute } from 'types/global'

const SubnetInformation: FirebaseRoute = (props) => {
  useTitle('Subnet Information')

  return (
    <>
      <span className={titleStyle}>Subnet Information</span>
      <span className={bodyStyle}>Hello World</span>
    </>
  )
}

export default SubnetInformation
