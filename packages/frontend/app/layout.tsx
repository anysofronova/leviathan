import '#/app/styles/globals.css'
import { PropsWithChildren } from 'react'

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="container mx-auto px-4">{children}</div>
      </body>
    </html>
  )
}

export default RootLayout
