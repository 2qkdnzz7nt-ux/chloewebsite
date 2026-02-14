import { prisma } from "@/lib/prisma";
import OrderList from "@/components/admin/OrderList";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Orders
        </h1>
      </div>
      <OrderList initialOrders={orders} />
    </div>
  );
}
