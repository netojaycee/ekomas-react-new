import React from 'react'
import { Breadcrumb } from '../components/Products/Breadcrumb'
import { ProductsList } from '../components/Products/ProductsList'
import SiteLayout from '../components/SiteLayout'

export const Products = () => {
  return (
<>
<SiteLayout>
<Breadcrumb />
<ProductsList />
</SiteLayout>
</>  )
}
