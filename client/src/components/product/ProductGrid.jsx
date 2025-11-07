import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!products.length)
    return (
      <div className="text-center py-20 text-muted-foreground">
        No products available.
      </div>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id || product.id} product={product} />
      ))}
    </div>
  );
}
