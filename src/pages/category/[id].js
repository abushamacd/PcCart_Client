import { useRouter } from "next/router";
import RootLayout from "../../components/Layouts/RootLayout";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../../components/UI/BreadCrumb";
import Link from "next/link";

const Category = () => {
  const router = useRouter();
  const products = useSelector((state) => state.product.data);
  const selectedProducts = products?.filter(
    (product) => product.category?._id === router.query.id
  );

  const catagories = useSelector((state) => state.category.data);
  const selectedCategory = catagories?.filter(
    (category) => category?._id === router.query.id
  );

  return (
    <div>
      <BreadCrumb title={selectedCategory && selectedCategory[0]?.title} />
      <div className="container py-4 mx-auto">
        <div className="flex flex-wrap ">
          {selectedProducts?.map((product) => (
            <div key={product?._id} className="p-4 md:w-1/3">
              <Link href={`/products/${product?._id}`}>
                <div className="h-full border-2 relative border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                  <div className="product_tag duration-300 badge badge-warning absolute top-[2%] right-[2%] capitalize font-medium text-xs">
                    {product?.status}
                  </div>
                  <div className="product_image h-[300px] flex justify-center items-center overflow-hidden rounded-xl ">
                    <img
                      className="h-[300px]"
                      src={product?.image}
                      alt="blog"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-md text-[#df4800] font-medium mb-1">
                      {product?.keyFeatures?.brand}
                    </h2>
                    <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                      {product?.productName}
                    </h1>
                    <div className="flex justify-between items-center">
                      <p className="leading-relaxed mb-3">
                        ${" "}
                        <span className="text-[#131921] font-bold italic">
                          {product?.price}
                        </span>
                      </p>
                      <ReactStars
                        count={5}
                        className="my-[10px]"
                        size={20}
                        value={product?.averageRating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

Category.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};