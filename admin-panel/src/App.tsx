import "@refinedev/antd/dist/reset.css";
import { AppProviders } from "./app/AppProviders";
import { AppRefine } from "./app/AppRefine";

export default function App() {
  return (
    <AppProviders>
      <AppRefine />
    </AppProviders>
  );
}
