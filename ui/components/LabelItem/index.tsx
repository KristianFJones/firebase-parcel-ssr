import React from 'react'
import { Typography } from '@rmwc/typography'

// CSS
import '@material/typography/dist/mdc.typography.min.css'

interface ItemProps {
  label: string
  value: string
}

export const LabelItem: React.FunctionComponent<ItemProps> = ({ label, value }) => (
  <Typography use='body1'>
    <label style={{ fontWeight: 'bold' }}>{label}: </label>
    {value}
  </Typography>
)
