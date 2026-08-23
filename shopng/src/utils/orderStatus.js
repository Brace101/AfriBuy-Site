// Simulates an order's fulfillment progressing over time so "My Orders"
// feels alive without a real backend pushing status updates. Each order
// advances automatically the longer it has existed since createdAt.
// Cancelled orders (order.status === 'cancelled') are left untouched.

export const ORDER_STAGES = [
  { key: 'pending', label: 'Order Placed', icon: '🧾' },
  { key: 'processing', label: 'Processing', icon: '📦' },
  { key: 'shipped', label: 'Shipped', icon: '🚚' },
  { key: 'delivered', label: 'Delivered', icon: '✅' },
]

// Minutes after creation at which each stage kicks in. Fast enough that a
// demo user can watch an order "progress" within the same session, but
// staged enough that it doesn't jump straight to delivered.
const STAGE_THRESHOLDS_MINUTES = {
  pending: 0,
  processing: 2,
  shipped: 10,
  delivered: 30,
}

export const getSimulatedStatus = (order) => {
  if (!order?.createdAt) return 'pending'
  if (order.status === 'cancelled') return 'cancelled'

  const minutesElapsed = (Date.now() - new Date(order.createdAt).getTime()) / 60000

  let current = 'pending'
  for (const stage of ORDER_STAGES) {
    if (minutesElapsed >= STAGE_THRESHOLDS_MINUTES[stage.key]) {
      current = stage.key
    }
  }
  return current
}

export const getStageIndex = (statusKey) =>
  ORDER_STAGES.findIndex((stage) => stage.key === statusKey)
