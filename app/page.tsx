import Hero from './components/sections/hero/';
import About from './components/sections/about';
import Projects from './components/sections/projects';
import Skills from './components/sections/skill';
import RippleEffect from './components/ui/ripple-effect';

export default function Page() {
  return (
    <main>
      <RippleEffect>
        <Hero/>
        <About />
        <Projects />
        <Skills />
      </RippleEffect>
    </main>
  );
}