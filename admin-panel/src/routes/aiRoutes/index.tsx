import { Route } from "react-router-dom";
import AiAssistant from "../../pages/ai-assistant";

export const aiRoutes = [
  <Route path="/ai-assistant" key="ai-assistant">
    <Route index element={<AiAssistant />} />
  </Route>,
];
