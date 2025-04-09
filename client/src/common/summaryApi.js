//see the utils folder file
export const baseUrl="http://localhost:5000"

const SummaryApi={
    addProducts:{
         url:`${baseUrl}/api/admin/products/add`,
         method:'post'
    },
    fetchAllProducts: {
        url: `${baseUrl}/api/admin/products/get`,
        method: "get",
      },
    editProduct: (id) => ({
        url: `${baseUrl}/api/admin/products/edit/${id}`,
        method: "put",
      }),
    deleteProduct: (id) => ({
        url: `${baseUrl}/api/admin/products/delete/${id}`,
        method: "delete",
      }),

      fetchFilteredProducts: (query) => ({
        url: `${baseUrl}/api/shop/products/get?${query}`,
        method: "get",
      }),

      fetchProductDetails: (id) => ({
        url: `${baseUrl}/api/shop/products/get/${id}`,
        method: "get",
      }),

      addToCart: {
        url: `${baseUrl}/api/shop/cart/add`,
        method: "post"
      },

      fetchCartItems: {
        url: `${baseUrl}/api/shop/cart/get`, 
        method: "get",
      },

      deleteCartItem: {
        url: `${baseUrl}/api/shop/cart`, 
        method: "delete",
      },

      updateCartQuantity: {
        url: `${baseUrl}/api/shop/cart/update-cart`,
        method: "put",
      },
}

export default SummaryApi