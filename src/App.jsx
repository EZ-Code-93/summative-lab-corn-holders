import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Chat from './chat/Chat'
import ShopContainer from './pages/ShopContainer'
import AdminPortal from './pages/AdminPortal'
import AdminForm from './pages/AdminForm'
import CornCard from './pages/CornCard'
import ProductList from './pages/ProductList'

function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/chat" element={<Chat />} />
       <Route path="/shop" element={<ShopContainer />}>
            <Route path="corn-card" element={<CornCard />} />
            <Route index element={<ProductList />} />
        </Route>
        <Route path="/admin" element={<AdminPortal />}>
            <Route path="form" element={<AdminForm />} />  
        </Route>
     </Routes>
   </BrowserRouter>
  )
}

export default App
