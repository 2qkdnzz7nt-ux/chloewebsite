import ProductForm from "@/components/admin/ProductForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
