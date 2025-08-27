import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import BlogSection from '@/components/BlogSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20">
        <HeroSection />
        <BlogSection />
      </div>
    </div>
  );
};

export default Index;
