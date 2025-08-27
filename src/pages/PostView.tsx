import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus  } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from "react-router-dom";
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect } from 'react';

const PostView = () => {
  const post = {
    id: 1,
    title: "How Memory Scanners Work",
    dateCreated: "2025-08-24",
    author: "dannybanno",
    readTime: "8 min read",
    category: "Systems Programming",
    tags: ["C++", "Memory", "Cybersecurity", "OS"],
    content: `Have you ever wondered how tools like Cheat Engine work? Or how debuggers access programs to inspect how they run? This weekend, I decided to answer these questions by building my own memory scanner from scratch.

This wasn't just about creating a tool, as there are already many readily available. It was about showcasing the fundamental concepts that support operating systems, cybersecurity and systems programming.

## What is a Memory Scanner?

A memory scanner is a tool used in cybersecurity and other fields when needing to examine the contents of the computer's RAM. It scans memory to detect, monitor or manipulate data currently being stored by running programs.

## Memory Management and The Operating System (OS)

An operating system, OS for short, is system software that manages hardware and software resources while providing services for computer programs. One of its core functions is memory management - the way the OS controls the RAM. It does this by: 

- Allocating and freeing memory for programs
- Tracking which memory is in use and by which process
- Process isolation; ensuring programs don't mess with each other's memory
- Improving memory efficiency via paging, segmentation and virtual memory

The OS uses memory management to allocate virtual memory. This is divided into regions with different permissions, purposes and address ranges. A memory scanner focuses on the sections marked as readable, since these can be safely accessed or manipulated.

## Memory Regions

Every running process receives its own isolated address space, divided into memory regions.

| Region type | Description | Permissions |
|-------------|-------------|-------------|
| .text | Executable code | read + execute |
| .data | Global / static variables | read + write |
| .heap | Dynamically allocated memory | via malloc, new, etc |
| .stack | Function call stack | local variables, return addresses |
| Mapped regions | DLL's Shared libraries, memory-mapped files | Depends |

Each of these regions have protection flags:

- **R**: Read
- **W**: Write  
- **X**: Executable

The scanner must respect these flags or bypass these protections when scanning the memory.

## How the OS Manages This

### Virtual Memory

Every Process sees its own isolated memory space, which the OS then maps to physical RAM. This allows memory scanners to target these specific processes without affecting other processes.

### Page Tables

Page tables are used to map virtual addresses to physical memory pages. Most scanners, including this one, don't interact with these directly. But they define what is accessible.

### Memory Protection

The OS uses protection mechanisms such as page permissions, to control what regions can be read or written.

### System Calls / APIs

Within scanners, system-level functions are called for example: \`ReadProcessMemory()\`, \`VirtualQueryEx()\`.

## How Memory Scanners Interact with This

### Attaching to Processes

When a program is running, it is given a unique Process ID, used to identify the process. To attatch the scanner to a process, we need its Process ID (PID) to identify which process we are attaching and Opening a handle to. We do so by creating a snapshot of all running processes then opening this handle and iterating through the processes with \`Process32First()\` and \`Process32Next()\`, to extract each Processes ID and placing them in a list.

\`\`\`cpp
std::vector<ProcessInfo> ProcessManager::getProcessList() {

    std::vector<ProcessInfo> processes;

    HANDLE snapShot;
    PROCESSENTRY32 processEntry;
    DWORD pid = 0;

    snapShot = CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);

    processEntry.dwSize = sizeof(PROCESSENTRY32);
    
    if (!Process32First(snapShot, &processEntry)) {
        CloseHandle(snapShot);
    }
    do {
        processes.emplace_back(processEntry.th32ProcessID, processEntry.szExeFile);
    } while (Process32Next(snapShot, &processEntry));

    CloseHandle(snapShot);
    return processes;
}
\`\`\`

Once we have the each processes Process ID, we call \`OpenProcess()\` and reference the PID to assign the Handle and the permissions needed, for our scanner; \`PROCESS_VM_READ\` and \`PROCESS_VM_WRITE\`.

### Scanning the Memory Regions

As mentioned earlier, a process does not have one continuous block of memory. They're split into regions, each with different protection flags such as read, write and execute.

To scan memory, we need to know what ranges are valid to read from. Therefore, we use \`VirtualQueryEx()\` to enumerate memory regions, when doing so we filter for readable and writable regions only via the flags: \`PAGE_READONLY\`, \`PAGE_READWRITE\`, \`PAGE_EXECUTE_READ\`, and \`PAGE_EXECUTE_READWRITE\`. Finally, if the region is suitable for read and writing, we add it to the Memory Regions vector.

\`\`\`cpp
void MemoryReader::scanMemoryRegions() {

    memoryRegions.clear();
    LPCBYTE addr = nullptr;
    MEMORY_BASIC_INFORMATION mbi;

    while (VirtualQueryEx(processHandle, addr, &mbi, sizeof(mbi)) == sizeof(mbi)) {
        if (mbi.State == MEM_COMMIT &&
            !(mbi.Protect & PAGE_NOACCESS) &&
            !(mbi.Protect & PAGE_GUARD)) {

            //only add if region is actually readable
            if (mbi.Protect & (PAGE_READONLY | PAGE_READWRITE | PAGE_EXECUTE_READ | PAGE_EXECUTE_READWRITE)) {
                memoryRegions.push_back(mbi);
                std::cout << "[+] Region: Base=" << mbi.BaseAddress
                    << " Size=" << mbi.RegionSize
                    << " Protect=" << std::hex << mbi.Protect << std::dec << std::endl;
            }
        }

        addr = static_cast<LPCBYTE>(mbi.BaseAddress) + mbi.RegionSize;
    }
}
\`\`\`

### Reading the Process Memory

Once we have the suitable regions stored, we can finally read the memory. Within our scanner, we have a wrapper for ReadProcessMemory (RPM), the Windows API function that copies memory from another process. When we read memory, we reference the Process Handle which we have already mentioned. The address, which we want to read from. The buffer, which is essentially the output. The size, the number of bytes to read, e.g int: 4 bytes. The bytes read, holds the actual number of bytes successfully read.

###
\`\`\`cpp
bool MemoryReader::readMemory(LPVOID address, void* buffer, size_t size) {
    SIZE_T bytesRead = 0;

    if (ReadProcessMemory(processHandle, address, buffer, size, &bytesRead) && bytesRead == size) {
        std::cout << "[+] - Successfully read: " << processHandle << " | Address: " << address << " | Value: " << buffer << std::endl;
        return true;
    }
    else {
        std::cout << "[-] - Failed to Read Memory! Error: " << GetLastError() << std::endl;
        return false;
    }

    return false; 
}
\`\`\`
###

### Scanning for Values

Once we have the regions and RPM setup, we can start scanning for values. First of all, we scan the memory regions again by calling \`memReader->scanMemoryRegions\` and assign it to the variable; \`memRegions\`, so we can loop through the regions. Like we did when scanning the memory regions, we skip the unreadable regions again by checking \`PAGE_READONLY\`, \`PAGE_READWRITE\`, \`PAGE_EXECUTE_READ\`, and \`PAGE_EXECUTE_READWRITE\`.
###
\`\`\`cpp
memReader->scanMemoryRegions();
auto memRegions = memReader->getMemoryRegions();
\`\`\`
###

Once we have the correct regions, we allocate a local buffer (\`std::vector<char>\`) equal to the region size  \`(m.RegionSize)\`. Then, we use our RPM wrapper to copy the entire region into this buffer from the process's memory.

###
\`\`\`cpp
if (!(m.Protect & (PAGE_READONLY | PAGE_READWRITE | PAGE_EXECUTE_READ | PAGE_EXECUTE_READWRITE)))
  continue;

std::vector<char> buffer(m.RegionSize);

if (!memReader->readMemory(m.BaseAddress, buffer.data(), buffer.size())) {
  std::cout << "[-] Failed reading region at: " << m.BaseAddress << std::endl;
  continue;
}
\`\`\`
###

At this point, the buffer contains a snapshot of the process's memory for that region. Therefore, we can now scan through the buffer and loop over every possible offset \`i\` in the buffer. At each step, we cast the next, \`sizeof(T)\`, bytes into a pointer to type T. And then check if the value matches \`targetValue\`.

###
\`\`\`cpp
for (size_t i = 0; i + sizeof(T) <= buffer.size(); i++) {
  T* p = reinterpret_cast<T*>(&buffer[i]);
  ...
}
\`\`\`
###

If a match is found, we compute the real memory address where it was found. By adding the \`BaseAddress + i\`, we receive the actual memory address within the process, as the \`BaseAddress\` is where the region starts in memory and \`i\` is the offset inside the buffer.

###
\`\`\`cpp
if (*p == targetValue) {
  ScanResult<T> result;
  result.address = reinterpret_cast<LPVOID>(
    reinterpret_cast<uintptr_t>(m.BaseAddress) + i
  );
  result.value = *p;
  results.push_back(result);

  std::cout << "[+] Found value " << *p << " at " << result.address << std::endl;
}
\`\`\`
###

Finally, we save the result into a vector and output it with the address and value.

## Conclusion

Building this memory scanner was a fun and educational experience. It allowed me to put theory into practice and understand the underlying concepts of operating systems and memory management.
`
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/#blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-foreground">
                {post.title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <header className="mb-8">
        <div className="mb-4">
          <Badge variant="secondary" className="text-xs font-mono uppercase mb-4">
            {post.category}
          </Badge>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground text-sm mb-4">
          <span>By {post.author}</span>
          <span>•</span>
          <time dateTime={post.dateCreated}>
            {formatDate(post.dateCreated)}
          </time>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs font-mono">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <article className="prose prose-invert prose-lg max-w-none mb-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-white mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-white mt-6 mb-3" {...props} />,
            p: ({node, ...props}) => <p className="text-gray-300 mb-4 leading-relaxed" {...props} />,
            ul: ({node, ...props}) => <ul className="text-gray-300 mb-4 ml-6 list-disc" {...props} />,
            li: ({node, ...props}) => <li className="mb-2" {...props} />,
            strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
            table: ({node, ...props}) => (
              <div className="overflow-x-auto mb-6">
                <table className="min-w-full border border-[#333] rounded-lg bg-[#1f1f1f] text-[#e0e0e0]" {...props} />
              </div>
            ),
            thead: ({node, ...props}) => (
              <thead className="bg-[#2a2a2a] text-[#e0e0e0]" {...props} />
            ),
            tr: ({node, ...props}) => (
              <tr className="border-b border-[#333]" {...props} />
            ),
            th: ({node, ...props}) => (
              <th className="px-4 py-2 text-left font-semibold" {...props} />
            ),
            td: ({node, ...props}) => (
              <td className="px-4 py-2 border-b border-[#333]" {...props} />
            ),
            
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus }
                  language={match[1]}
                  PreTag="div"
                  className="rounded-lg my-4"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className="text-blue-400 bg-gray-800 px-2 py-1 rounded text-sm" {...props}>
                  {children}
                </code>
              );
            },
            
          }}
          
        >
          {post.content}
        </ReactMarkdown>
      </article>

      <Link to="/" className="text-primary hover:text-muted-foreground transition-colors font-mono">
        ← Back to Blog
      </Link>
    </div>
  );
};

export default PostView;