import BlogCard from './BlogCard';

const BlogSection = () => {
  const featuredPost = {
    id: 1,
    title: 'How Memory Scanners Work',
    description: 'Building a memory scanner from scratch to understand OS fundamentals, cybersecurity concepts, and systems programming.',
    category: 'Systems',
    date: '2025-08-24',
    readTime: '8 min',
    tags: ['memory-scanner', 'operating-systems', 'cybersecurity', 'c++'],
    featured: true
  };

  const posts = [
    
  ];

  return (
    <section id="blog" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl font-mono font-bold text-primary mb-4">
            Recent Posts
          </h2>
          <p className="text-muted-foreground">
            Technical writeups on security research, reverse engineering, and low-level programming.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <BlogCard {...featuredPost} />
        </div>

        {/* All Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <BlogCard key={index} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;