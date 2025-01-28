import { Route, Routes } from 'react-router-dom';
import './index.css';
import { HomePage } from './pages/Home/HomePage';
import { RegisterPage } from './pages/Home/RegisterPage';
import { LoginPage } from './pages/Home/LoginPage';
import { HomeBlogs } from './pages/Blogs/HomeBlogs';
import { CreateBlogs } from './pages/Blogs/CreateBlogs';
import { UpdateBlogs } from './pages/Blogs/UpdateBlogs';
import { NavBar, RoutedProtected } from './components';

function App() {
  return (
    <div>
      <NavBar></NavBar>
      <main>
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route element={<RoutedProtected></RoutedProtected>}>
            <Route path="/blogs/home" element={<HomeBlogs></HomeBlogs>}></Route>
            <Route
              path="/blogs/create"
              element={<CreateBlogs></CreateBlogs>}
            ></Route>

            <Route
              path="blogs/update/:blogId"
              element={<UpdateBlogs></UpdateBlogs>}
            ></Route>
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
