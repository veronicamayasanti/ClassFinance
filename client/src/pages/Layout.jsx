import React from "react";

function Layout({children}) {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-md mx-auto">
                {children}
            </div>
        </div>
    )
}

export default Layout;