import React from 'react'
import { TextField } from '@rmwc/textfield'
import { Typography } from '@rmwc/typography'
import { useFormField } from '../useFormField'

import '@material/textfield/dist/mdc.textfield.css'
import '@material/floating-label/dist/mdc.floating-label.css'
import '@material/notched-outline/dist/mdc.notched-outline.css'
import '@material/line-ripple/dist/mdc.line-ripple.css'

export const LoginForm = () => {
  const UsernameInput = useFormField({
    Type: TextField,
    label: 'Username',
  })

  const PasswordInput = useFormField({
    Type: TextField,
    label: 'Password',
  })

  return (
    <>
      <Typography use='headline4'>Login Form</Typography>
      {UsernameInput}
      {PasswordInput}
    </>
  )
}
