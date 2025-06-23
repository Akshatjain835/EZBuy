//see the utils folder file
export const baseUrl="http://localhost:5000"

const SummaryApi={

    //Admin product api
    addProducts:{
         url:`${baseUrl}/api/admin/products/add`,
         method:'post'
    },
    fetchAllProducts: {
        url: `${baseUrl}/api/admin/products/get`,
        method: "get",
      },
    editProduct: {
        url: `${baseUrl}/api/admin/products/edit`,
        method: "put",
      },
    deleteProduct: {
        url: `${baseUrl}/api/admin/products/delete`,
        method: "delete",
      },

      //product api
      fetchAllFilteredProducts:{
        url: `${baseUrl}/api/shop/products/get`,
        method: "get",
      },
      fetchProductDetails: {
        url: `${baseUrl}/api/shop/products/get`,
        method: "get",
      },

      //cart api
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

      //user address api
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

      //order api
      createOrder: {
        method: "post",
        url: `${baseUrl}/api/shop/order/create`,
      },
      capturePayment: {
        method: "post",
        url: `${baseUrl}/api/shop/order/save`,
      },
      getAllOrdersByUserId: {
        method: "get",
        url: `${baseUrl}/api/shop/order/list`, 
      },
      getOrderDetails: {
        method: "get",
        url: `${baseUrl}/api/shop/order/details`, 
      },

      //Admin order api
      getAllOrdersForAdmin: {
        method: "get",
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

      //search api
      searchResults:{
        method: "get",
        url: `${baseUrl}/api/shop/search` 
      },

      //review api
      addReview: {
        method: "post",
        url: `${baseUrl}/api/shop/review/add`,
      },
      getReviews: {
        method: "get",
        url: `${baseUrl}/api/shop/review`,
      },

      //common api
      getCommonImage: {
        method: "get",
        url: `${baseUrl}/api/common/feature/get`
      },
      addCommonImage: {
        method: "post",
        url: `${baseUrl}/api/common/feature/add`
      },

      //user api
      registerUser: {
        method: "post",
        url: `${baseUrl}/api/user/register`
      },
      loginUser: {
        method: "post",
        url: `${baseUrl}/api/user/login`
      },
      logoutUser: {
        method: "post",
        url: `${baseUrl}/api/user/logout`
      },
      getUserDetails: {
        method: "get",
        url: `${baseUrl}/api/user/details`
      }

}

export default SummaryApi