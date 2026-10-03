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
          class="text-xl md:text-2xl text-gray-600 mb-4 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1000': isLoaded }"
        >
          {{ portfolio.title }}
        </h2>

        <p
          class="mb-8 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1000': isLoaded }"
        >
          <span class="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
            <span class="w-2 h-2 rounded-full bg-green-500"></span>
            {{ portfolio.currently }}
          </span>
        </p>

        <p
          class="max-w-2xl mx-auto text-gray-600 mb-12 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1200': isLoaded }"
        >
          {{ portfolio.intro }}
        </p>

        <div
          class="flex flex-col items-center gap-8 opacity-0 transform translate-y-10"
          :class="{ 'animate-fade-in-up delay-1500': isLoaded }"
        >
          <div class="flex items-center gap-4">
            <a
              v-for="social in portfolio.socials"
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              target="_blank"
              rel="noopener noreferrer"
              class="social-button"
              :style="{ '--brand': social.color }"
            >
              <span class="relative block w-12 h-12 rounded-full group">
                <span
                  class="floater w-full h-full absolute top-0 left-0 bg-(--brand) rounded-full duration-300 group-hover:-top-8 group-hover:shadow-2xl"
                ></span>
                <span
                  class="icon relative z-10 w-full h-full flex items-center justify-center border-2 border-(--brand) rounded-full"
                >
                  <component :is="social.icon" size="22" class="group-hover:text-(--brand) text-white duration-300" />
                </span>
              </span>
            </a>
          </div>

          <a
            :href="portfolio.resume"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-900 border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-colors"
          >
            <file-text-icon class="h-4 w-4" />
            View Resume
          </a>
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
                class="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg opacity-0"
                v-observe-visibility="{ callback: onVisibilityChange, once: true }"
                :class="{ 'animate-fade-in': isAboutVisible }"
              >
                <img :src="portfolio.avatar" alt="Profile" class="w-full h-full object-cover" />
              </div>
            </div>
            <div
              class="md:col-span-2 space-y-4 text-gray-600 opacity-0"
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

    <!-- Experience Section -->
    <section id="experience" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Experience</h2>
        <div class="max-w-4xl mx-auto">
          <div
            v-for="(job, index) in portfolio.experience"
            :key="index"
            class="mb-12 relative pl-8 opacity-0 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200"
            v-observe-visibility="{ callback: (isVisible) => onItemVisibility(isVisible, 'experience', index), once: true }"
            :class="{ 'animate-fade-in-left': visibleItems.experience.includes(index) }"
          >
            <div class="absolute left-0 top-0 w-2 h-2 rounded-full bg-gray-400 transform -translate-x-0.5"></div>
            <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
              <h3 class="text-xl font-bold text-gray-900">{{ job.company }}</h3>
              <p class="text-sm text-gray-500">{{ job.period }}</p>
            </div>
            <p class="text-sm text-gray-500">{{ job.location }}</p>

            <div v-for="role in job.roles" :key="role.title" class="mt-4">
              <div class="flex flex-col md:flex-row md:justify-between md:items-baseline">
                <p class="font-medium text-gray-800">{{ role.title }}</p>
                <p v-if="job.roles.length > 1" class="text-sm text-gray-500 italic">{{ role.period }}</p>
              </div>
              <ul class="mt-2 space-y-2 text-gray-600 list-disc pl-5">
                <li v-for="(point, i) in role.points" :key="i">{{ point }}</li>
              </ul>
            </div>

            <div v-if="job.technologies" class="flex flex-wrap gap-2 mt-4">
              <span
                v-for="tech in job.technologies"
                :key="tech"
                class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Projects</h2>
        <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            v-for="(project, index) in portfolio.projects"
            :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col opacity-0"
            v-observe-visibility="{ callback: (isVisible) => onItemVisibility(isVisible, 'projects', index), once: true }"
            :class="{ 'animate-fade-in-up': visibleItems.projects.includes(index) }"
          >
            <img v-if="project.image" :src="project.image" :alt="project.title" class="w-full h-48 object-cover" />
            <div v-else class="w-full h-48 bg-gray-900 flex items-center justify-center">
              <component :is="project.icon" class="h-16 w-16 text-white" stroke-width="1.5" />
            </div>
            <div class="p-6 flex flex-col flex-1">
              <p v-if="project.org" class="text-xs font-medium uppercase tracking-wide text-gray-500 mb-1">{{ project.org }}</p>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ project.title }}</h3>
              <p class="text-gray-600 mb-4">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-4 mt-auto">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                >
                  {{ tech }}
                </span>
              </div>
              <div v-if="project.demo || project.github" class="flex space-x-4">
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

    <!-- Skills Section -->
    <section id="skills" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Skills</h2>
        <div class="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div
            v-for="(group, index) in portfolio.skills"
            :key="group.category"
            class="bg-white rounded-lg shadow-md p-6 border border-gray-100 opacity-0"
            v-observe-visibility="{ callback: (isVisible) => onItemVisibility(isVisible, 'skills', index), once: true }"
            :class="{ 'animate-fade-in-up': visibleItems.skills.includes(index) }"
          >
            <h3 class="text-lg font-bold text-gray-900 mb-4">{{ group.category }}</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in group.items"
                :key="skill"
                class="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education Section -->
    <section id="education" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">Education</h2>
        <div class="max-w-4xl mx-auto">
          <div
            v-for="(edu, index) in portfolio.education"
            :key="index"
            class="mb-12 relative pl-8 opacity-0 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-200"
            v-observe-visibility="{ callback: (isVisible) => onItemVisibility(isVisible, 'education', index), once: true }"
            :class="{ 'animate-fade-in-left': visibleItems.education.includes(index) }"
          >
            <div class="absolute left-0 top-0 w-2 h-2 rounded-full bg-gray-400 transform -translate-x-0.5"></div>
            <h3 class="text-xl font-bold text-gray-900">{{ edu.degree }}</h3>
            <p class="text-gray-600">{{ edu.school }}</p>
            <p class="text-sm text-gray-500">{{ edu.period }}</p>
            <p v-if="edu.description" class="mt-2 text-gray-600">{{ edu.description }}</p>
            <template v-if="edu.relevant_courses">
              <p class="mt-2 text-gray-600 font-bold">Relevant Courses:</p>
              <div class="flex flex-wrap gap-2 mt-2">
                <span
                  v-for="course in edu.relevant_courses"
                  :key="course"
                  class="px-2 py-1 text-xs rounded-full bg-white border border-gray-200 text-gray-600"
                >
                  {{ course }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-20">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-4">Contact</h2>
        <p class="text-center text-gray-600 mb-12">
          Open to embedded and firmware opportunities. Send a message below or email me at
          <a :href="`mailto:${portfolio.email}`" class="font-medium text-gray-900 underline hover:text-gray-600">{{ portfolio.email }}</a>.
        </p>
        <div
          class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 border border-gray-100 opacity-0"
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

             <button :disabled="formSubmitting" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-60">
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md text-gray-900 group-hover:text-white group-hover:bg-transparent group-hover:dark:bg-transparent">
              {{ formSubmitting ? 'Sending...' : 'Send Message' }}
              </span>
           </button>

            </div>
            <p v-if="formSuccess" class="text-green-600 text-center">
              Your message has been sent successfully!
            </p>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 border-t border-gray-200">
      <p class="text-center text-sm text-gray-500">
        &copy; {{ new Date().getFullYear() }} {{ portfolio.name }}
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  MenuIcon,
  XIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MailIcon,
  FileTextIcon,
  CpuIcon,
  RadioIcon
} from 'lucide-vue-next'
import emailjs from '@emailjs/browser'
import avatarImage from './assets/images/avatar.jpg'
import damfitImage from './assets/images/logo.png'
import shellImage from './assets/images/cowsay.png'

// Portfolio data
const portfolio = {
  name: 'Edson Fuentes',
  avatar: avatarImage,
  email: 'fuenteed@oregonstate.edu',
  resume: '/Edson-Fuentes-Resume.pdf',
  title: 'Embedded Software Engineer · M.Eng. Computer Science at Oregon State University',
  currently: 'Embedded Software Lead @ Global Formula Racing',
  intro: 'I like writing firmware.',
  about: [
    'I\'m an embedded software engineer and Master of Engineering student in Computer Science at Oregon State University, where I also completed my B.S. in Computer Science.',
    'I currently lead the embedded software team at Global Formula Racing, and most recently I was a System Control Firmware Intern at Ampere Computing, working on Zephyr RTOS.',
    'I\'m also President of OSU\'s Embedded Systems Design Club and a member of the Society of Hispanic Professional Engineers. When I\'m not coding, find me playing soccer or spending time with my family.'
  ],
  socials: [
    { name: 'GitHub', icon: GithubIcon, url: 'https://github.com/fuenteed', color: '#171515' },
    { name: 'LinkedIn', icon: LinkedinIcon, url: 'https://linkedin.com/in/edsonfuentes', color: '#0077B5' },
    { name: 'Email', icon: MailIcon, url: 'mailto:fuenteed@oregonstate.edu', color: '#4b5563' },
    { name: 'Instagram', icon: InstagramIcon, url: 'https://instagram.com/eddy_sonn', color: '#a78bfa' }
  ],
  experience: [
    {
      company: 'Global Formula Racing (Oregon State University)',
      location: 'Corvallis, OR',
      period: 'Feb 2026 - Present',
      roles: [
        {
          title: 'Embedded Software Lead',
          period: 'Aug 2026 - Present',
          points: [
            'Lead a 3-person embedded team and own firmware for all 5+ vehicle electronics boards; split board ownership across members and wrote onboarding documentation for the firmware workflow.',
            'Leading development of a C telemetry system on a Raspberry Pi CM5 that reads vehicle CAN traffic through SPI CAN controllers via SocketCAN, logs to onboard storage, and streams live data to a ground station.'
          ]
        },
        {
          title: 'Software Engineer',
          period: 'Feb 2026 - Aug 2026',
          points: [
            'Developed STM32G431 (Cortex-M4F) firmware in C++ for a custom sensor/actuator PCB, generating PWM servo control and acquiring analog sensor data over the vehicle CAN network.',
            'Implemented a CCP slave enabling live calibration of servo pulse widths and sensor scaling from Vector CANoe without reflashing; verified with CAN traces and oscilloscope captures.'
          ]
        }
      ],
      technologies: ['C', 'C++', 'STM32', 'CAN / FDCAN', 'SocketCAN', 'CCP', 'Vector CANoe', 'Raspberry Pi CM5']
    },
    {
      company: 'Ampere Computing',
      location: 'Portland, OR',
      period: 'Jun 2026 - Sep 2026',
      roles: [
        {
          title: 'System Control Firmware Intern',
          points: [
            'Owned the migration of system control firmware from Zephyr RTOS v4.3 to v4.4, resolving 5 breaking upstream API and configuration changes and validating boot and runtime behavior on target hardware.',
            'Updated and debugged the AHB controller and PL011 UART Zephyr drivers in C for the v4.4 release.',
            'Validated the upgrade with Twister test suites in Docker-based CI on simulated targets, then on real SoC hardware in a remote lab.'
          ]
        }
      ],
      technologies: ['C', 'Zephyr RTOS', 'Devicetree', 'Kconfig', 'Twister', 'Docker']
    },
    {
      company: 'Embedded Systems Design Club',
      location: 'Oregon State University',
      period: 'Jun 2026 - Present',
      roles: [
        {
          title: 'President',
          points: [
            'Planned a full academic year of club meetings, including 5 fall-term technical workshops on bare-metal C, peripheral interfacing, and hardware debugging on ARM Cortex-M.'
          ]
        }
      ]
    }
  ],
  projects: [
    {
      title: 'Vehicle Telemetry System (In Progress)',
      org: 'Global Formula Racing',
      description: 'A C telemetry system on a Raspberry Pi CM5 that reads the car\'s CAN traffic through SPI CAN controllers via SocketCAN, logs it to onboard storage, and streams live data to a ground station.',
      icon: RadioIcon,
      technologies: ['C', 'Embedded Linux', 'Raspberry Pi CM5', 'SocketCAN', 'SPI']
    },
    {
      title: 'Sensor/Actuator Board Firmware',
      org: 'Global Formula Racing',
      description: 'STM32G431 firmware in C++ for a custom PCB that drives PWM servos and reads analog sensors over the vehicle CAN network, with a CCP slave for live calibration from Vector CANoe without reflashing.',
      icon: CpuIcon,
      technologies: ['C++', 'STM32 / Cortex-M4F', 'CAN', 'CCP', 'PWM', 'ADC']
    },
    {
      title: 'Small Shell in C',
      description: 'A Unix-like shell supporting built-ins, I/O redirection, and external commands via fork/exec and waitpid, with SIGINT/SIGTSTP handling for foreground/background process control.',
      image: shellImage,
      technologies: ['C', 'POSIX', 'Signals', 'Process Control', 'GDB'],
      github: 'https://github.com/fuenteed/smallsh'
    },
    {
      title: 'DamFit',
      description: 'A web application that allows Oregon State University faculty and staff to track their fitness goals and progress.',
      image: damfitImage,
      technologies: ['React', 'Docker', 'React Native', 'Node.js', 'Express', 'Supabase', 'Svelte'],
      github: 'https://github.com/adulbrich/TrekTrak'
    }
  ],
  skills: [
    {
      category: 'Languages',
      items: ['C', 'C++', 'Python', 'Rust', 'Bash']
    },
    {
      category: 'Embedded',
      items: ['STM32 / ARM Cortex-M', 'Zephyr RTOS', 'Devicetree', 'Kconfig', 'west', 'Embedded Linux', 'Raspberry Pi CM5']
    },
    {
      category: 'Interfaces',
      items: ['CAN / FDCAN', 'SocketCAN', 'CCP', 'SPI', 'I2C', 'UART', 'PWM', 'ADC']
    },
    {
      category: 'Tools',
      items: ['GDB', 'ST-Link', 'Vector CANoe', 'Twister', 'Docker', 'PlatformIO', 'CMake', 'Make', 'Git', 'Oscilloscope']
    }
  ],
  education: [
    {
      degree: 'Master of Engineering in Computer Science',
      school: 'Oregon State University',
      period: 'Expected Summer 2027'
    },
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'Oregon State University',
      period: 'Sep 2022 - Jun 2025',
      description: 'Graduated with a 3.7 GPA while participating in the Society of Hispanic Professional Engineers.',
      relevant_courses: [
        'Operating Systems',
        'Computer Networks',
        'Parallel Programming',
        'Analysis of Algorithms',
        'Cloud Application Development'
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
        'Web Development'
      ]
    }
  ]
}

// Navigation sections
const sections = [
  { id: 'about', name: 'About' },
  { id: 'experience', name: 'Experience' },
  { id: 'projects', name: 'Projects' },
  { id: 'skills', name: 'Skills' },
  { id: 'education', name: 'Education' },
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
  experience: [],
  projects: [],
  skills: [],
  education: []
})

// Typing animation variables
const displayedName = ref('')
const isCursorVisible = ref(true)
const fullName = portfolio.name
const isTypingComplete = ref(false)
const typingSpeed = 200 // milliseconds per character - increased for slower typing
let blinkInterval = null

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

  if (currentLength < fullName.length) {
    displayedName.value = fullName.substring(0, currentLength + 1)
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
  blinkInterval = setInterval(() => {
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
    let serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    let templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    let publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    // Use EmailJS to send email
    const result = await emailjs.send(
      serviceId, // Replace with your EmailJS service ID
      templateId, // Replace with your EmailJS template ID
      {
        from_name: contactForm.value.name,
        from_email: contactForm.value.email,
        message: contactForm.value.message,
        to_name: portfolio.name,
      },
      publicKey // Replace with your EmailJS public key
    );

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
    alert('Failed to send message: ' + (error.text || error.message));
  } finally {
    formSubmitting.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  // Initialize EmailJS
  emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

  // Add scroll event listener
  window.addEventListener('scroll', handleScroll)

  // Start typing animation after a short delay
  setTimeout(() => {
    typeWriter()
  }, 500)

  // Trigger initial animations
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})

// Clean up
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  clearInterval(blinkInterval)
})
</script>

<style>


html {
  scroll-behavior: smooth;
}

body {
  background-color: white;
}

/* Offset anchor jumps so section headings aren't hidden under the fixed nav */
section {
  scroll-margin-top: 4rem;
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
