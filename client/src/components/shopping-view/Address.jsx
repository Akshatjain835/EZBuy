import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/CommonForm'
import { addressFormControls } from '@/config';
import { addNewAddress, deleteAddress, editaAddress, fetchAllAddresses } from '@/redux/shop/shoppingAddressSlice';
import { useToast } from '@/hooks/use-toast'
import { useDispatch, useSelector } from 'react-redux';
import AddressCard from './AddressCard';


const Address = ({setCurrentSelectedAddress}) => {

  const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
  };
  
    const  [formData, setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const { addressList } = useSelector((state) => state.shopAddress);
    const { toast } = useToast();

    const handleManageAddress=(e)=>{
      e.preventDefault();
  
      if (addressList.length >= 3 && currentEditedId === null) {
        setFormData(initialAddressFormData);
        toast({
          title: "You can add max 3 addresses",
          variant: "destructive",
        });
  
        return;
      }
  
      currentEditedId !== null
        ? dispatch(
            editaAddress({
              userId: user?.id,
              addressId: currentEditedId,
              formData,
            })
          ).then((data) => {
            // console.log(data);
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id));
              setCurrentEditedId(null);
              setFormData(initialAddressFormData);
              toast({
                title: "Address updated successfully",
              });
            }
          })
        : dispatch(
            addNewAddress({
              ...formData,
              userId: user?.id,
            })
          ).then((data) => {
            // console.log(data)
            if (data?.payload?.success) {
              dispatch(fetchAllAddresses(user?.id));
              setFormData(initialAddressFormData);
              toast({
                title: "Address added successfully",
              });
            }
          });
    }
  
    const handleEditAddress=(getCurrentAddress)=>{

      setCurrentEditedId(getCurrentAddress?._id);

      setFormData({
        ...formData,
        address: getCurrentAddress?.address,
        city: getCurrentAddress?.city,
        phone: getCurrentAddress?.phone,
        pincode: getCurrentAddress?.pincode,
        notes: getCurrentAddress?.notes,
      });
    }

    const handleDeleteAddress=(getCurrentAddress)=>{
      // console.log(getCurrentAddress, "getCurrentAddress")

      dispatch(
        deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAllAddresses(user?.id));
          toast({
            title: "Address deleted successfully",
          });
        }
      });
    }

    const isFormValid=()=>{

      return Object.keys(formData)
        .map((key) => formData[key].trim() !== "")
        .every((item) => item);
    }

    useEffect(() => {
      dispatch(fetchAllAddresses(user?.id));
    }, [dispatch, user?.id]);
   
    // console.log(addressList, "addressList");
    
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {
        addressList && addressList.length > 0
          ? addressList.map((addressItem) => (
              <AddressCard
                selectedId={currentEditedId} 
                handleDeleteAddress={handleDeleteAddress}
                addressInfo={addressItem}
                handleEditAddress={handleEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            ))
          : null}
      </div>

    <CardHeader>
      <CardTitle>
        {currentEditedId !== null ? "Edit Address" : "Add New Address"}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      <CommonForm
        formControls={addressFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={currentEditedId !== null ? "Edit" : "Add"}
        onSubmit={handleManageAddress}
        isBtnDisabled={!isFormValid()}
      />
    </CardContent>
  </Card>
  )
}

export default Address