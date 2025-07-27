//@ts-nocheck
import React from 'react'
import { Switch } from '@radix-ui/themes'
import { ThemeContext } from '../layout'
import { useContext } from 'react'
export default function ThemeSwitch() {
    const {appearance,setAppearance}=useContext(ThemeContext)
  return (
    <div>
        <Switch
        checked={appearance=="dark"}
        onCheckedChange={() => setAppearance(appearance=="dark"?"light":"dark")}
      />
    </div>
  )
}
