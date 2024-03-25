import React from 'react'
import SiteLayout from '../components/SiteLayout'
import { Card } from '@material-tailwind/react'
import CheckoutForm from '../components/CheckoutCard'
import paymentcard from '../assets/images/cards.webp'

export default function Checkout() {
  return (
      <div className='flex w-full lg:w-[70%] h-full overflow-y-auto my-10 rounded-md mx-auto bg-white items-center bg-[#f8f8f8] gap-6'>
        <div className='flex-col flex w-full h-[90%] p-8'>
          <div>
            <h2 className='text-4xl'>Payment Details</h2>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <CheckoutForm />

            <Card className='border bg-paymentcard object-cover relative h-full rounded-none pb-20'>
            </Card>

          </div>
        </div>
      </div>
  )
}
