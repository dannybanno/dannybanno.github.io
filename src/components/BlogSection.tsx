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
    {
      id: 2,
      title: 'Building a Custom Debugger',
      description: 'Creating a debugger from scratch to understand process manipulation and memory analysis.',
      category: 'Systems',
      date: '2025-08-20',
      readTime: '12 min',
      tags: ['debugger', 'process', 'windows-api']
    },
    {
      id: 3,
      title: 'Process Injection Techniques',
      description: 'Exploring various methods of code injection including DLL injection and process hollowing.',
      category: 'Security',
      date: '2025-08-15',
      readTime: '10 min',
      tags: ['injection', 'dll', 'security']
    },
    {
      id: 4,
      title: 'Windows API Deep Dive',
      description: 'Understanding core Windows API functions for system programming and security research.',
      category: 'Windows',
      date: '2025-08-10',
      readTime: '15 min',
      tags: ['windows-api', 'system-calls', 'c++']
    },
    {
      id: 5,
      title: 'Cheat Engine Internals',
      description: 'Analyzing how Cheat Engine works under the hood and building similar functionality.',
      category: 'Tools',
      date: '2025-08-05',
      readTime: '9 min',
      tags: ['cheat-engine', 'memory', 'game-hacking']
    },
    {
      id: 6,
      title: 'Virtual Memory Management',
      description: 'Understanding how operating systems manage virtual memory and address spaces.',
      category: 'Systems',
      date: '2025-08-01',
      readTime: '11 min',
      tags: ['virtual-memory', 'os', 'memory-management']
    }
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