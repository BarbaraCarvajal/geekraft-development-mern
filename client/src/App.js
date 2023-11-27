import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Policy from './pages/Policy/Policy';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Register from './pages/Auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import AllUsers from './pages/Admin/AllUsers';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products/Products';
import UpdateProduct from './pages/Admin/Updateproduct/UpdateProduct';
import Search from './pages/Search/Search';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Categories from './pages/Categories/Categories';
import CartPage from './pages/CartPage/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import AssistantRoute from './components/Routes/AssistantRoute';
import AssistantDashboard from './pages/Assistant/AssistantDashboard';
import CreatePost from './pages/Admin/CreatePost';
import PostsList from './pages/Posts/PostList/PostList';
import PostDetail from './pages/Posts/PostDetail/PostDetail';
import AllPost from './pages/Admin/allPost/AllPost';
import UpdatePost from './pages/Admin/UpdatePost/UpdatePost';
import CreateCategoryAssistant from './pages/Assistant/CreateCategory/CreateCategory';
import CreateProductAssistant from './pages/Assistant/CreateProduct';
import CreatePostAssistant from './pages/Assistant/CreatePost';
import AllPostAssistant from './pages/Assistant/allPost/AllPost';
import UpdatePostAssistant from './pages/Assistant/UpdatePost/UpdatePost';
import ProductsAssistant from './pages/Assistant/Products/Products';
import UpdateProductAssistant from './pages/Assistant/Updateproduct/UpdateProduct';
import CategoryProduct from './pages/CategoryProduct/CategoryProduct';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<Search />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/blog" element={<PostsList />} />
      <Route path="/product/:slug" element={<ProductDetails />} />
      <Route path="/blog/blog-get-posts/:slug" element={<PostDetail />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/policy" element={<Policy />} />
      <Route path="*" element={<PageNotFound />} />
      
      {/*Rutas de usuario*/}
      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>
      
      {/*Rutas de admin*/}
      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/product/:slug" element={<UpdateProduct />} />
        <Route path="admin/products" element={<Products />} />

        <Route path="admin/blog-create-post" element={<CreatePost />} />
        <Route path="admin/blog-get-posts" element={<AllPost />} />
        <Route path="admin/blog-update-post/:slug" element={<UpdatePost />} />

        <Route path="admin/users" element={<AllUsers />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>

      {/*Rutas de Asistente*/}
      <Route path='/dashboard' element={<AssistantRoute/>}>
        <Route path="assistant" element={<AssistantDashboard />} />
        <Route path="assistant/create-category" element={<CreateCategoryAssistant />} />
        <Route path="assistant/create-product" element={<CreateProductAssistant />} />
        <Route path="assistant/product/:slug" element={<UpdateProductAssistant />} />
        <Route path="assistant/products" element={<ProductsAssistant />} />

        <Route path="assistant/blog-create-post" element={<CreatePostAssistant />} />
        <Route path="assistant/blog-get-posts" element={<AllPostAssistant />} />
        <Route path="assistant/blog-update-post/:slug" element={<UpdatePostAssistant />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>

      <Route path="/posts" element={<PostsList />} />
          
      {/* <Route path="/blog-get-posts" element={<Blog/>} />
      <Route path= "/blog/:postId" element={<Post/>} />
       */}

      
    </Routes>

    </>
  );
}

export default App;
