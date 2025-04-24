<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Navigation -->
    <nav class="fixed w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-200 shadow-sm">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" class="text-xl font-medium text-gray-800">
          {{ portfolio.name }}
        </a>

        <div class="hidden md:flex space-x-8">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="text-gray-600 hover:text-gray-900 transition-colors"
            :class="{ 'text-gray-900 font-medium': activeSection === section.id }"
          >
            {{ section.name }}
          </a>
        </div>

        <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2">
          <menu-icon v-if="!mobileMenuOpen" class="h-6 w-6 text-gray-600" />
          <x-icon v-else class="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute w-full bg-white border-b border-gray-200"
      >
        <div class="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="text-gray-600 hover:text-gray-900 py-2 transition-colors"
            :class="{ 'text-gray-900 font-medium': activeSection === section.id }"
            @click="mobileMenuOpen = false"
          >
            {{ section.name }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="min-h-screen flex items-center justify-center pt-16">
      <div class="container mx-auto px-4 text-center">
        <div class="mb-8 inline-block">
          <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-2">
            <span>{{ displayedName }}</span><span class="cursor" :class="{ 'blink': isTypingComplete || isCursorVisible }">█</span>
          </h1>
        </div>

        <h2
          class="text-xl md:text-2xl text-gray-600 mb-8 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1000': isLoaded }"
        >
          {{ portfolio.title }}
        </h2>

        <p
          class="max-w-2xl mx-auto text-gray-600 mb-12 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1200': isLoaded }"
        >
          {{ portfolio.intro }}
        </p>

        <div
          class="flex justify-center space-x-6 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1500': isLoaded }"
        >

  <div class="flex items-center gap-4">
    <!-- GitHub Button -->
    <a :href="portfolio.socials[0].url" target="_blank" rel="noopener noreferrer" class="social-button">
      <button class="relative w-12 h-12 rounded-full group">
        <div
          class="floater w-full h-full absolute top-0 left-0 bg-[#171515] rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
        ></div>
        <div
          class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-[#171515] rounded-full"
        >
          <GithubIcon size="22" class="group-hover:text-[#171515] text-white duration-300" />
        </div>
      </button>
    </a>
    
    <!-- LinkedIn Button -->
    <a :href="portfolio.socials[1].url" target="_blank" rel="noopener noreferrer" class="social-button">
      <button class="relative w-12 h-12 rounded-full group">
        <div
          class="floater w-full h-full absolute top-0 left-0 bg-[#0077B5] rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
        ></div>
        <div
          class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-[#0077B5] rounded-full"
        >
          <LinkedinIcon size="22" class="group-hover:text-[#0077B5] text-white duration-300" />
        </div>
      </button>
    </a>
    
    <!-- Instagram Button -->
    <a :href="portfolio.socials[2].url" target="_blank" rel="noopener noreferrer" class="social-button">
      <button class="relative w-12 h-12 rounded-full group">
        <div
          class="floater w-full h-full absolute top-0 left-0 bg-violet-400 rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
        ></div>
        <div
          class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-violet-400 rounded-full"
        >
          <InstagramIcon size="22" class="group-hover:text-violet-400 text-white duration-300" />
        </div>
      </button>
    </a>
  </div>

        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">About</h2>
        <div class="max-w-4xl mx-auto">
          <div class="grid md:grid-cols-3 gap-8 items-center">
            <div class="md:col-span-1">
              <div
                class="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg"
                v-observe-visibility="{ callback: onVisibilityChange, once: true }"
                :class="{ 'animate-fade-in': isAboutVisible }"
              >
                <img :src="portfolio.avatar" alt="Profile" class="w-full h-full object-cover" />
              </div>
            </div>
            <div
              class="md:col-span-2 space-y-4 text-gray-600"
              v-observe-visibility="{ callback: onAboutTextVisibility, once: true }"
              :class="{ 'animate-fade-in-right': isAboutTextVisible }"
            >
              <p v-for="(paragraph, index) in portfolio.about" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Education</h2>
        <div class="max-w-4xl mx-auto">
          <div
            v-for="(edu, index) in portfolio.education"
            :key="index"
            class="mb-12 relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200"
            v-observe-visibility="{ callback: (isVisible) => onItemVisibility(isVisible, 'education', index), once: true }"
            :class="{ 'animate-fade-in-left': visibleItems.education.includes(index) }"
          >
            <div class="absolute left-0 top-0 w-2 h-2 rounded-full bg-gray-400 transform -translate-x-0.5"></div>
            <h3 class="text-xl font-bold text-gray-900">{{ edu.degree }}</h3>
            <p class="text-gray-600">{{ edu.school }}</p>
            <p class="text-sm text-gray-500">{{ edu.period }}</p>
            <p class="mt-2 text-gray-600">{{ edu.description }}</p>
            <p class="mt-2 text-gray-600 font-bold">Relevant Courses:</p>
            <div
            v-for="(course, index) in edu.relevant_courses"
            :key="index"
            class="mt-2 text-gray-600"
            >
              {{ course }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Projects</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in portfolio.projects"
            :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            v-observe-visibility="{ callback: (isVisible) => onItemVisibility(isVisible, 'projects', index), once: true }"
            :class="{ 'animate-fade-in-up': visibleItems.projects.includes(index) }"
          >
            <img :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {{ tech }}
                </span>
              </div>
              <div class="flex space-x-4">
                <a
                  v-if="project.demo"
                  :href="project.demo"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Live Demo
                </a>
                <a
                  v-if="project.github"
                  :href="project.github"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Contact</h2>
        <div
          class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-100"
          v-observe-visibility="{ callback: onContactVisibility, once: true }"
          :class="{ 'animate-fade-in-up': isContactVisible }"
        >
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                v-model="contactForm.name"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-900"
                required
              />
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                v-model="contactForm.email"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-900"
                required
              />
            </div>
            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                v-model="contactForm.message"
                rows="5"
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-900"
                required
              ></textarea>
            </div>
            <div class="flex justify-center">
            <button class="w-1/2 bg-black h-[50px] my-3 flex items-center 
            justify-center rounded-xl cursor-pointer relative 
            overflow-hidden transition-all 
            duration-500 ease-in-out shadow-md hover:scale-105 
            hover:shadow-lg before:absolute before:top-0 before:-left-full 
            before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49]
             before:to-[rgb(105,184,141)] before:transition-all before:duration-500 
             before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Send Message
            </button>
            </div>
            <p v-if="formSuccess" class="text-green-600 text-center">
              Your message has been sent successfully!
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import {
  MenuIcon,
  XIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon
} from 'lucide-vue-next'
import avatarImage from './assets/images/avatar.jpg'
import damfitImage from './assets/images/logo.png'
import premierLeagueImage from './assets/images/Premier-League-Logo.png'
import shellImage from './assets/images/cowsay.png'
import normImage from './assets/images/norm.png'

// Portfolio data
const portfolio = ref({
  name: 'Edson Fuentes',
  avatar: avatarImage,
  title: 'Computer Science & Statistics Student at Oregon State University',
  intro: 'Welcome to my portfolio! I\'m passionate about software development, machine learning, and creating elegant solutions to complex problems.',
  about: [
    'I am a final-year Computer Science student with a focus on artificial intelligence and statistics. I am also a member of the Society of Hispanic Professional Engineers.',
    'I am passionate about Machine Learning and Statistics, and I am always looking for new ways to apply them to real-world problems.',
    'When I\'m not coding, find me playing soccer or spending time with my family.'
  ],
  socials: [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/fuenteed', bgColor: 'bg-[#171515]' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/edsonfuentes', bgColor: 'bg-[#0077B5]' },
    { name: 'Instagram', icon: 'instagram', url: 'https://instagram.com/eddy_sonn', bgColor: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]' }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science & Minor in Statistics',
      school: 'Oregon State University',
      period: '2022 - Present (Expected to Finish in August 2025)',
      description: 'Focusing on AI and Statistics. Maintaining a 3.6 GPA while participating in the Society of Hispanic Professional Engineers.',
      relevant_courses: [
        'Machine Learning & Data Mining',
        'Bayesian Statistics',
        'Computer Network',
        'Operating Systems',
        'Analysis of Algorithms',
        'Cloud Application Development',
        'Parallel Programming',
      ]
    },
    {
      degree: 'Associates Transfer Degree in Computer Science',
      school: 'Chemeketa Community College',
      period: '2020 - 2022',
      description: 'Graduated with an Associates Transfer Degree in Computer Science and 3.8 GPA.',
      relevant_courses: [
        'Data Structures & Algorithms',
        'Computer Architecture',
        'Java Programming',
        'Web Development',
      ]
    }
  ],
  projects: [
    {
      title: 'Small Shell in C',
      description: 'A small shell in C that allows the user to execute commands and navigate the file system.',
      image: shellImage,
      technologies: ['C', 'Operating Systems', 'System Programming', 'Unix Environment'],
      demo: '#',
      github: 'https://github.com/fuenteed/smallsh'
    },
    {
      title: 'DamFit',
      description: 'A web application that allows Oregon State University faculty and staff to track their fitness goals and progress.',
      image: damfitImage,
      technologies: ['React', 'Docker', 'React Native', 'Node.js', 'Express','Supabase', 'Svelte'],
      demo: '#',
      github: 'https://github.com/adulbrich/TrekTrak'
    },
    {
      title: 'Premier League Prediction App (In Progress)',
      description: 'A web application that leverages machine learning to predict the outcomes of Premier League matches. Accurate ~70% of the time.',
      image: premierLeagueImage,
      technologies: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'Matplotlib', 'NumPy', 'Machine Learning'],
      demo: '#',
      github: 'https://github.com/fuenteed/premier-league-predict'
    },
    {
      title: 'Norm: Oregon State University\'s Statistics Chatbot (In Progress)',
      description: 'A chatbot that uses natural language processing to answer questions about our university\'s statistics department.(Set to finish by June 2025)',
      image: normImage,
      technologies: ['Python', 'React', 'FastAPI', 'LangChain', 'Hugging Face', 'SQLite', 'Pinecone'],
      demo: 'https://media.oregonstate.edu/media/t/1_9cbuo3q3',
      github: '#'
    },
  ]
})

// Navigation sections
const sections = [
  { id: 'about', name: 'About' },
  { id: 'education', name: 'Education' },
  { id: 'projects', name: 'Projects' },
  { id: 'contact', name: 'Contact' }
]

// State variables
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('hero')
const isLoaded = ref(false)
const isAboutVisible = ref(false)
const isAboutTextVisible = ref(false)
const isContactVisible = ref(false)
const visibleItems = ref({
  education: [],
  projects: []
})

// Typing animation variables
const displayedName = ref('')
const isCursorVisible = ref(true)
const fullName = computed(() => portfolio.value.name)
const isTypingComplete = ref(false)
const typingSpeed = 200 // milliseconds per character - increased for slower typing

// Contact form
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})
const formSubmitting = ref(false)
const formSuccess = ref(false)

// Handle scroll events
const handleScroll = () => {
  scrolled.value = window.scrollY > 50

  // Determine active section
  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i].id)
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = sections[i].id
      break
    }
  }
}

// Typing animation function
const typeWriter = () => {
  const currentLength = displayedName.value.length

  if (currentLength < fullName.value.length) {
    displayedName.value = fullName.value.substring(0, currentLength + 1)
    setTimeout(typeWriter, typingSpeed)
  } else {
    isTypingComplete.value = true
    // Start cursor blinking only after typing is complete
    blinkCursor()
  }
}

// Cursor blinking function
const blinkCursor = () => {
  // Make sure the cursor starts visible
  isCursorVisible.value = true
  // Set up the blinking interval
  setInterval(() => {
    if (isTypingComplete.value) {
      isCursorVisible.value = !isCursorVisible.value
    }
  }, 530)
}

// Visibility callbacks for animations
const onVisibilityChange = (isVisible) => {
  if (isVisible) {
    isAboutVisible.value = true
  }
}

const onAboutTextVisibility = (isVisible) => {
  if (isVisible) {
    isAboutTextVisible.value = true
  }
}

const onContactVisibility = (isVisible) => {
  if (isVisible) {
    isContactVisible.value = true
  }
}

const onItemVisibility = (isVisible, section, index) => {
  if (isVisible && !visibleItems.value[section].includes(index)) {
    visibleItems.value[section].push(index)
  }
}

// Form submission
const submitForm = async () => {
  formSubmitting.value = true
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.value.name,
        email: contactForm.value.email,
        message: contactForm.value.message
      }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    
    // Reset form and show success message
    contactForm.value = {
      name: '',
      email: '',
      message: ''
    }
    formSuccess.value = true
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      formSuccess.value = false
    }, 5000)
  } catch (error) {
    alert('Failed to send message: ' + error.message);
  } finally {
    formSubmitting.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)

  // Start typing animation after a short delay
  setTimeout(() => {
    typeWriter()
    // Removed blinkCursor() from here as it will be called after typing completes
  }, 500)

  // Trigger initial animations
  setTimeout(() => {
    isLoaded.value = true
  }, 100)

  // Clean up
  return () => {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style>


html {
  scroll-behavior: smooth;
}

body {
  background-color: white;
}

/* Animation classes */
.animate-fade-in {
  animation: fadeIn 0.8s ease forwards;
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease forwards;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease forwards;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease forwards;
}

/* Animation keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Cursor blinking animation */
.cursor {
  display: inline-block;
  width: 0.6em;
  margin-left: 2px;
}

.blink {
  animation: blink 1.06s steps(2, start) infinite;
}

@keyframes blink {
  to {
    visibility: hidden;
  }
}

/* Add delay classes */
.delay-1000 {
  animation-delay: 1s;
}

.delay-1200 {
  animation-delay: 1.2s;
}

.delay-1500 {
  animation-delay: 1.5s;
}
</style>
