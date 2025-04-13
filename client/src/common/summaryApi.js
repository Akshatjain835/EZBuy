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

      addUserAddress: {
        url: `${baseUrl}/api/shop/address/add`,
        method: "post",
      },

      getUserAddresses:{
        url: `${baseUrl}/api/shop/address/get/`,
        method: "get",
      },

      updateAddress: {
        method: "put",
        url: `${baseUrl}/api/shop/address/update`,
      },
      deleteAddress: {
        method: "delete",
        url: `${baseUrl}/api/shop/address/delete`,
      },

      createOrder: {
        method: "psot",
        url: `${baseUrl}/api/shop/order/create`,
      },

      capturePayment: {
        method: "post",
        url: `${baseUrl}/api/shop/order/capture`,
      },

      getAllOrdersByUserId: {
        method: "get",
        url: `${baseUrl}/api/shop/order/list`, 
      },
      getOrderDetails: {
        method: "get",
        url: `${baseUrl}/api/shop/order/details`, 
      },

      getAllOrdersForAdmin: {
        method: "GET",
        url: `${baseUrl}/api/admin/orders/get`,
      },

      getOrderDetailsForAdmin: {
        method: "get",
        url: `${baseUrl}/api/admin/orders/details` 
      },
      updateOrderStatus: {
        method: "put",
        url: `${baseUrl}/api/admin/orders/update` 
      },

      searchResults:{
        method: "get",
        url: `${baseUrl}/api/shop/search` 
      },
      addReview: {
        method: "post",
        url: `${baseUrl}/api/shop/review/add`,
      },
      getReviews: {
        method: "get",
        url: `${baseUrl}/api/shop/review`,
      },

      getCommonImage: {
        method: "get",
        url: `${baseUrl}/api/common/feature/get`
      },
      addCommonImage: {
        method: "post",
        url: `${baseUrl}/api/common/feature/add`
      }
       

}

export default SummaryApi