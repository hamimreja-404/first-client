import React from 'react';
import Hero from '../components/Hero.jsx';
import Courses from '../components/Courses.jsx';
import Skills from '../components/Skills.jsx';
import Trainer from '../components/Trainer.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQs from '../components/FAQs.jsx';

function Home({ lang, setView, setDetailCourseId, setCheckoutCourse }) {
  
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero 
        lang={lang}
        onExploreCourses={() => handleScrollTo('courses')}
        onMeetCoach={() => handleScrollTo('about')}
        onJoinLive={() => setDetailCourseId('workshop')}
      />
      <Courses 
        lang={lang}
        onSelectDetailCourse={setDetailCourseId}
        onSelectCheckoutCourse={(title, price) => setCheckoutCourse({ title, price })}
      />
      <Skills lang={lang} />
      <Trainer lang={lang} />
      <Testimonials lang={lang} />
      <FAQs lang={lang} />
    </>
  );
}

export default Home;
