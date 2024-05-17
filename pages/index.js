import Layout from '@/components/Layout'
import React from 'react'

export default function Home() {
  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-center">Welcome to the Dashboard!</h1>
        <p className="text-lg text-center">Here you can manage your admin tasks.</p>
      </div>
    </Layout>
  )
}
