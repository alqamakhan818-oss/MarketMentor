import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Learn from "@/pages/Learn";
import MarketingPlanner from "@/pages/MarketingPlanner";
import ContentIdeas from "@/pages/ContentIdeas";
import Checklist from "@/pages/Checklist";
import Quiz from "@/pages/Quiz";
import Progress from "@/pages/Progress";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/planner" element={<MarketingPlanner />} />
      <Route path="/content-ideas" element={<ContentIdeas />} />
      <Route path="/checklist" element={<Checklist />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/progress" element={<Progress />} />
    </Routes>
  );
}

export default App;
