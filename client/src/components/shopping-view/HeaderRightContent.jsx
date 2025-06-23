import { logoutUser } from '@/redux/authslice/authSlice';
import { LogOut, ShoppingCart, UserCog } from 'lucide-react';
import { Sheet } from '../ui/sheet';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import UserCartWrapper from './UserCartWrapper';
import { fetchCartItems } from '@/redux/shop/shoppingCartSlice';


const HeaderRightContent=()=>{

    const { user } = useSelector((state) => state.auth);
    // console.log(user)
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const { cartItems } = useSelector((state) => state.shopCart);

    const navigate = useNavigate();
    const dispatch = useDispatch();
  

  
    const handleLogout=()=>{
      dispatch(logoutUser());
    }

    useEffect(() => {
      dispatch(fetchCartItems(user?.id));
    }, [dispatch, user?.id]);


    // console.log(cartItems, "Akshat ");
  
    return (
      <div className="flex lg:items-center lg:flex-row flex-col gap-4">
        <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
          <Button
            onClick={() => setOpenCartSheet(true)}
            variant="outline"
            size="icon"
            className="relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
            </span>
            <span className="sr-only">User cart</span>
          </Button>

          <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
        </Sheet>
  
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black">
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-56">
            <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <UserCog className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  export default HeaderRightContent;