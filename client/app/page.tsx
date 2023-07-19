import Button from '@/components/Button'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div>
        <Image src="/zebra-logo.png" width={200} height={200} alt="Zebra" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Zebra</h1>
        <p className="mt-6 text-xl font-semibold">Your finance assistant</p>
        <p className="mt-2">Start a conversation with Zebra rigth now!</p>
        <Button />
      </div>
    </div>
  )
}
