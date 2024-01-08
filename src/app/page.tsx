import { DealList, Hero } from "./(content)/hero";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <DealList />
    </main>
  );
}
