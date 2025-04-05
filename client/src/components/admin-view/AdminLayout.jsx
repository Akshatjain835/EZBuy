import { Outlet } from "react-router-dom";
import AdminSideBar from "./AdminHeader.jsx";
import AdminHeader from "./AdminSidebar.jsx";
import { useState } from "react";

const AdminLayout=()=> {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* admin sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader setOpen={setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;