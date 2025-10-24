'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Wallet, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import toast from 'react-hot-toast'

export function WalletBalance({ onRefresh }) {
  const [balance, setBalance] = useState('0.00')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const fetchBalance = async () => {
    try {
      const response = await fetch('/api/wallet/balance')
      if (response.ok) {
        const data = await response.json()
        setBalance(parseFloat(data.balance).toFixed(2))
      } else {
        toast.error('Failed to fetch balance')
      }
    } catch (error) {
      toast.error('Error fetching balance')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchBalance()
    onRefresh?.()
  }

  useEffect(() => {
    fetchBalance()
  }, [])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
        <div className="flex items-center space-x-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <div className="animate-pulse bg-gray-200 h-8 w-24 rounded"></div>
          ) : (
            `$${balance}`
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Available balance
        </p>
      </CardContent>
    </Card>
  )
}
