import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import ArticlePage from "./pages/ArticlePage";
import Tools from "./pages/Tools";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import About from "./pages/About";
import TarotDaily from "./pages/TarotDaily";
import CreatorDiagnostic from "./pages/CreatorDiagnostic";
import EnergyCards from "./pages/EnergyCards";
import ResourceLibrary from "./pages/ResourceLibrary";
import Policies from "./pages/Policies";
import ExternalStep from "./pages/ExternalStep";
import { SiteFrame } from "./components/SiteFrame";
import { Analytics } from "./components/Analytics";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <SiteFrame>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/journal"} component={Journal} />
        <Route path={"/journal/:slug"} component={ArticlePage} />
        <Route path={"/tools"} component={Tools} />
        <Route path={"/tarot-daily"} component={TarotDaily} />
        <Route path={"/creator-diagnostic"} component={CreatorDiagnostic} />
        <Route path={"/energy-cards"} component={EnergyCards} />
        <Route path={"/services"} component={Services} />
        <Route path={"/shop"} component={Shop} />
        <Route path={"/resources/:resourceId"} component={ResourceLibrary} />
        <Route path={"/about"} component={About} />
        <Route path={"/policies"} component={Policies} />
        <Route path={"/continue/:destination"} component={ExternalStep} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteFrame>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <Analytics />
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
