import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Shop() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Shop</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Curated digital and physical goods.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-zinc-200 transition-transform duration-500 group-hover:scale-105 dark:bg-zinc-800" />
              )}
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <p className="col-span-full text-center text-zinc-500">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
