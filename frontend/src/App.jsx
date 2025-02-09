import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { Grades, Home, Notes } from "./pages";
import { Navbar, Searchbar } from "./components";

const Layout = () => (
  <div className="app">
    <Navbar />
    <div className="app-content">
      <Searchbar />
      <Outlet />
    </div>
  </div>
);

const UnderDevelopment = () => (
  <div className="underDevelopment">
    <h1>Under Development</h1>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="classes" element={<UnderDevelopment />} />
          <Route path="grades" element={<Grades />} />
          <Route path="instructors" element={<UnderDevelopment />} />
          <Route path="notes" element={<Notes />} />
          <Route path="settings" element={<UnderDevelopment />} />
          <Route path="logout" element={<UnderDevelopment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
