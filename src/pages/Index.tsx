import Story from "@/components/Story";
import HomePage from "./Home";
import { useAuthStore } from "@/store/useAuthStore";
const Index = () => {
  const { authUser } = useAuthStore();
  return authUser !== null ? <HomePage /> : <Story />;
};

export default Index;
