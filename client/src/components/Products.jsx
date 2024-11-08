import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productListAction } from "../Redux/Actions/Product";

const Products = () => {
  const dispatch = useDispatch();
  const productListReducer = useSelector((state) => state.productListReducer);
  const { loading, error, products = [] } = productListReducer;

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {/* เพิ่ม Banner ที่นี่ */}
          <section className="relative">
            <img
              src="http://localhost:3000/images/banner4.jpg"  // ใส่ URL ของรูปที่ต้องการใช้เป็น Banner
              alt="Banner"
              className="w-full h-auto object-cover"  // รูปเต็มหน้าจอและปรับตามขนาด
            />
          </section>

          {/* ส่วนที่แสดงสินค้า */}
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                {products.map((product) => (
                  <div className="p-4 lg:w-1/4 md:w-1/2" key={product._id}>
                    <div className="bg-white border-2 border-gray-300 rounded-lg p-4">
                      <div className="group relative">
                        <div className="h-60 w-full overflow-hidden rounded-md bg-white group-hover:opacity-75 border-2 border-white flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-auto object-cover object-center"
                          />
                        </div>
                        <div className="mt-4 flex justify-between">
                          <div>
                            <h3 className="text-sm text-gray-700">
                              <Link to={`/products/${product._id}`}>
                                <span aria-hidden="true" className="absolute inset-0"></span>
                                {product.name}
                              </Link>
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Review Count : {product.numReview}
                            </p>
                          </div>
                          <p className="text-sm font-medium text-gray-900">${product.price}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Products;
