import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import Academics from "@/pages/Academics";
import BeyondAcademics from "@/pages/BeyondAcademics";
import Facilities from "@/pages/Facilities";
import Admissions from "@/pages/Admissions";
import Gallery from "@/pages/Gallery";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

// Get base path from import.meta.env or default to /DBMS-Website/
const BASE_PATH = import.meta.env.BASE_URL || '/DBMS-Website/';

function Router() {
  // Handle GitHub Pages 404.html redirect
  useEffect(() => {
    const search = window.location.search;
    
    // Check if we're coming from the 404.html redirect
    if (search.includes('?/')) {
      const redirectPath = search.split('?/')[1]?.split('&')[0]?.replace(/~and~/g, '&') || '';
      if (redirectPath) {
        const newPath = BASE_PATH + redirectPath.replace(/^\//, '');
        window.history.replaceState(null, '', newPath);
        window.location.reload();
      }
    }
  }, []);

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/academics" component={Academics} />
      <Route path="/beyond-academics" component={BeyondAcademics} />
      <Route path="/facilities" component={Facilities} />
      <Route path="/admissions" component={Admissions} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Component to handle scroll restoration on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function App() {
  return (
    <TooltipProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow pt-20"> {/* pt-20 to account for fixed header */}
          <Router />
        </main>
        <Footer />
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
