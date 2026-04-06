import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';
import { ShoppingProvider } from './context/ShoppingContext';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MealPlan from './pages/MealPlan';
import Recipes from './pages/Recipes';
import RecipeFinder from './pages/RecipeFinder';
import Videos from './pages/Videos';
import Pricing from './pages/Pricing';
import CalorieCalculator from './pages/CalorieCalculator';
import Login from './pages/Login';
import Register from './pages/Register';
import ShoppingList from './pages/ShoppingList';
import Profile from './pages/Profile';
import AIPlanner from './pages/AIPlanner';
import InstallGuide from './pages/InstallGuide';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FavoritesProvider>
          <ShoppingProvider>
            <BrowserRouter>
              <ScrollToTop />
              <Header />
              <main style={{ minHeight: '100vh' }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/meal-plan" element={<MealPlan />} />
                  <Route path="/recipes" element={<Recipes />} />
                  <Route path="/recipe-finder" element={<RecipeFinder />} />
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/calculator" element={<CalorieCalculator />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/shopping-list" element={<ShoppingList />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/ai-planner" element={<AIPlanner />} />
                  <Route path="/install" element={<InstallGuide />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </BrowserRouter>
          </ShoppingProvider>
        </FavoritesProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
