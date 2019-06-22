import React, { useState, ChangeEvent, useMemo } from 'react'
import { style } from 'typestyle'
import { TextField } from '@rmwc/textfield'
import { Select } from '@rmwc/select'

interface UseFormField {
  label: string
}

interface UseFormFieldTextField extends UseFormField {
  Type: typeof TextField
}

interface UseFormFieldSelect extends UseFormField {
  Type: typeof Select
}

type useFormFieldParams = UseFormFieldTextField | UseFormFieldSelect

const FieldStyle = style({
  marginTop: '1em',
})

export const useFormField = ({ Type, ...props }: useFormFieldParams) => {
  const [fieldValue, setFieldValue] = useState()
  const onChange: {
    [key: string]: (e: ChangeEvent<any>) => void
  } = {
    TextField: ({ target }: ChangeEvent<HTMLInputElement>) => setFieldValue(target.value),
    Select: ({ target }: ChangeEvent<HTMLSelectElement>) => setFieldValue(target.value),
  }

  const Field = useMemo(
    () => (
      <Type
        outlined
        className={FieldStyle}
        value={fieldValue}
        onChange={onChange[Type.displayName as string]}
        {...props}
      />
    ),
    [fieldValue],
  )

  return Field
}
