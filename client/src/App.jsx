import './App.css'
import {BrowserRouter as Router, Route,Routes} from "react-router-dom";
import Layout from "./pages/Layout.jsx";
import UserPage from "./pages/UserPage.jsx";


function App() {

  return (
    <Router>
        <Layout>
            <Routes>
                <Route path="/dashboard/users" element={<UserPage/>} />
            </Routes>
        </Layout>

    </Router>
  );
}

export default App;