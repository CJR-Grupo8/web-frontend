import NavBar from "@/components/NavBar";
import "@/styles/app-css/home.css";

export default function VerMaisLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="home-root">
      <NavBar />
    
    {children}
   
    </main>
  );
}
