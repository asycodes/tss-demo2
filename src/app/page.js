import Image from 'next/image'
import Link from 'next/link'

// Will be used to access the app, showthe information of the app etc. 

export default function Home() {
  return (
    <div>
      <h1> HELLO WORLD</h1>
      <Link href="/journey">Our App</Link>
    </div>
  )
}
