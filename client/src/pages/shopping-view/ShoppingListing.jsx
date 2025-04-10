import ProductFilter from '@/components/shopping-view/ProductFilter.jsx'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts, fetchProductDetails } from '@/redux/shop/shoppingProductSlice'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import CreateSearchParams from './helper/CreateSearchParams'
import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog.jsx'
import { addToCart, fetchCartItems } from '@/redux/shop/shoppingCartSlice'
import { useToast } from '@/hooks/use-toast'

const ShoppingListing = () => {

  const dispatch=useDispatch();

  const { productList,productDetails } = useSelector( (state) => state.shopProducts);

  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { toast } = useToast();




  const handleSort=(value)=>{
    setSort(value);
  }

  const handleFilter=(getSectionId, getCurrentOption)=>{
    // console.log(getSectionId,getCurrentOption)

    let cpyFilters = { ...filters };

    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    
    }  
    
    else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);
      
      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }
     // console.log(cpyFilters)

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  const handleGetProductDetails=(getCurrentProductId)=>{

    // console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  const handleAddtoCart=(getCurrentProductId)=>{
    // console.log(cartItems,"cartitemssection");
  

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
  

  useEffect(() => {

    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});

  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = CreateSearchParams(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);


  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
  }, [dispatch, sort, filters]);

  // console.log("filters",filters)
  // console.log("filters",searchParams)
  //console.log(productDetails)

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  
  return (
    
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
    <ProductFilter filters={filters} handleFilter={handleFilter} />

    <div className="bg-background w-full rounded-lg shadow-sm">
      <div className="p-4 border-b flex items-center justify-between">

        <h2 className="text-lg font-extrabold">All Products</h2>

        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">
            100 Products
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowUpDownIcon className="h-4 w-4" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} >

                {
                sortOptions.map((sortItem) => (
                  <DropdownMenuRadioItem
                  value={sortItem.id}
                  key={sortItem.id}

                  >
                      {sortItem.label}
                  </DropdownMenuRadioItem>

                ))
                }

              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ShoppingProductTile
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetailsDialog
        productDetails={productDetails}
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        
      />
    </div>
  )
}

export default ShoppingListing