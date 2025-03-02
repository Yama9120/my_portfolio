import Hero from './components/sections/hero';
import About from './components/sections/about';
import Projects from './components/sections/projects';
import Skills from './components/sections/skill';

export default function Page() {
  return (
    <main>
      <Hero/>
      <About />
      <Projects />
      <Skills />
    </main>
  );
}