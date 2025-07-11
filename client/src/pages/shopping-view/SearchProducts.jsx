import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { getSearchResults, resetSearchResults } from '@/redux/shop/shoppingSearchSlice'
import { useDispatch, useSelector } from 'react-redux'
import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { useToast } from '@/hooks/use-toast'
import { addToCart, fetchCartItems } from '@/redux/shop/shoppingCartSlice'
import { fetchProductDetails } from '@/redux/shop/shoppingProductSlice'

const SearchProducts = () => {

    const [keyword, setKeyword] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
    const { searchResults } = useSelector((state) => state.shopSearch);
    const dispatch = useDispatch();
    const { productDetails,productList } = useSelector((state) => state.shopProducts);
    
     const { cartItems } = useSelector((state) => state.shopCart);
     const { toast } = useToast();
     const { user } = useSelector((state) => state.auth);
     const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
          setTimeout(() => {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(getSearchResults(keyword));
          }, 1000);
        } else {
          setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
          dispatch(resetSearchResults());
        }
      }, [keyword]);
      
//   console.log(searchResults, "searchResults");

const handleAddtoCart=(getCurrentProductId, getTotalStock)=>{

        // console.log(cartItems);

        let getCartItems = cartItems.items || [];
    
        if (getCartItems.length) {

          const indexOfCurrentItem = getCartItems.findIndex(
            (item) => item.productId === getCurrentProductId
          );

          if (indexOfCurrentItem > -1) {
            const getQuantity = getCartItems[indexOfCurrentItem].quantity;
            // console.log(getQuantity, "getQuantity", getTotalStock, "getTotalStock");

            if (getQuantity + 1 > getTotalStock) {
              toast({
                title: `Only ${getQuantity} quantity can be added for this item`,
                variant: "destructive",
              });
    
              return;
            }
          }
        }

        dispatch(
            addToCart({
              userId: user?.id,
              productId: getCurrentProductId,
              quantity: 1,
            })

          ).then((data) => {

            if (data?.payload?.success) {
              dispatch(fetchCartItems(user?.id));
              toast({
                title: "Product is added to cart",
              });
            }
          });

 }

 const  handleGetProductDetails=(getCurrentProductId)=>{
    // console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  return (

    <div className="container mx-auto md:px-6 px-4 py-8">
    <div className="flex justify-center mb-8">

      <div className="w-full flex items-center">
        <Input
          value={keyword}
          name="keyword"
          onChange={(event) => setKeyword(event.target.value)}
          className="py-6"
          placeholder="Search Products..."
        />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {searchResults && searchResults.length ? (
          searchResults.map((item) => <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} handleAddtoCart={handleAddtoCart} product={item} />)
        ) : (
          <h1 className="text-5xl font-extrabold">Nothing found here...</h1>
        )}
      </div>

  
    <ProductDetailsDialog
      open={openDetailsDialog}
      setOpen={setOpenDetailsDialog}
      productDetails={productDetails}
    />
  </div>

  )
}

export default SearchProducts