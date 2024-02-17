import Layout from '@/components/Layout'
import Link from 'next/link'
import React from 'react'

export default function Products() {
  return (
    <Layout>
        <Link className="bg-gray-300 py-1 px-2" href={'/products/new'}>Add new Product</Link>
    </Layout>
  )
}
