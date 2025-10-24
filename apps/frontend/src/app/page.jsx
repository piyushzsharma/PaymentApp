import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CreditCard, Shield, Users, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Secure Digital Payments
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Send money instantly, securely, and seamlessly. Whether it's peer-to-peer transfers or merchant payments, we've got you covered.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signin">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline" size="lg">Create Account</Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Transfers</h3>
            <p className="text-gray-600">Send money instantly to anyone, anywhere</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Bank-Level Security</h3>
            <p className="text-gray-600">Your money and data are protected with enterprise-grade security</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">P2P Payments</h3>
            <p className="text-gray-600">Split bills, send gifts, or pay friends effortlessly</p>
          </Card>

          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Merchant Payments</h3>
            <p className="text-gray-600">Accept payments from customers seamlessly</p>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-gray-600 mb-6">
              Join thousands of users who trust us with their digital payments
            </p>
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Create Your Account
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  )
}
