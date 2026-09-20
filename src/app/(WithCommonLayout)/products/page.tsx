import AllProducts from "@/components/modules/products";
import ProductBanner from "@/components/modules/products/banner";
import CategoryCard from "@/components/ui/core/CategoryCard";
import RuContainer from "@/components/ui/core/RuContainer";
import { getAllCategories } from "@/services/category";
import { getAllProducts } from "@/services/Product";
import { ICategory } from "@/types/category";

const AllProductsPage = async () => {
  const { data: categories } = await getAllCategories();
  const { data: products } = await getAllProducts();

  return (
    <RuContainer>
      <ProductBanner title="All Products" path="Home - Products" />
      <h2 className="text-xl font-bold my-5">Featured Collection </h2>
      <div className="grid grid-cols-6 gap-6">
        {categories?.slice(0, 6).map((category: ICategory, idx: number) => (
          <CategoryCard key={idx} category={category} />
        ))}
      </div>
      <AllProducts products={products} />
    </RuContainer>
  );
};

export default AllProductsPage;
