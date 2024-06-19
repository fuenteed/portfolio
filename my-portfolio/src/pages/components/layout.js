import React from "react"

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl">My Portfolio</h1>
      </header>
      <main className="p-4">
        {children}
      </main>
      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>&copy; 2024 My Portfolio</p>
      </footer>
    </div>
  )
}

export default Layout
