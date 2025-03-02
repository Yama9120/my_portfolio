import Hero from './components/sections/hero';
import Projects from './components/sections/projects';
import Skills from './components/sections/skill';

export default function Page() {
  return (
    <main>
      <Hero/>
      <Projects />
      <Skills />
    </main>
  );
}