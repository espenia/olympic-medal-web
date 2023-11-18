'use client'
 
import { Button } from '@tremor/react'
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <Button type="submit" aria-disabled={pending}>
      Guardar
    </Button>
  )
}