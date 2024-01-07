import { Hero } from "./(content)/Hero";
import { Categories } from "./(content)/Hero";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Categories />
    </main>
  );
}
