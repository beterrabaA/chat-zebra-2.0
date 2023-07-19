'use client'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className="my-4 flex justify-between">
      <div className="flex items-center">
        <Image
          src="/zebra-logo.png"
          className="mr-4"
          width={30}
          height={30}
          alt="Zebra"
        />
        <h1 className="text-2xl font-semibold">Zebra</h1>
      </div>
      <div className="flex items-center">
        <Link href="/history">
          <Image
            src="/msg-icon.png"
            className="mr-4"
            width={30}
            height={30}
            alt="Message"
          />
        </Link>
        <Link href="/">
          <Image
            className="cursos-pointer"
            src="/exit-icon.png"
            width={30}
            height={30}
            alt="Exit"
          />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
