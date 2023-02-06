<template>
  <div class="bg-white">
    <header>
      <Popover class="bg-white relative">
        <div class="flex mx-auto max-w-7xl py-6 px-4 items-center justify-between sm:px-6 md:space-x-10 md:justify-start lg:px-8">
          <div class="flex justify-start lg:flex-1 lg:w-0">
            <a href="#" class="flex justify-between items-center">
              <span class="sr-only">MassVerse.Space</span>
              <img class="h-8 mr-2 w-auto sm:h-10" src="https://tailwindui.com/img/logos/mark.svg?from-color=purple&from-shade=600&to-color=indigo&to-shade=600&toShade=600" alt="">
              <h1 class="font-bold text-xl text-purple-800">MassVerse.Space</h1>
            </a>
          </div>

          <div class="-my-2 -mr-2 md:hidden">
            <PopoverButton class="bg-white rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-500">
              <span class="sr-only">Open menu</span>
              <Bars3Icon class="h-6 w-6" aria-hidden="true" />
            </PopoverButton>
          </div>
          <PopoverGroup as="nav" class="space-x-10 hidden md:flex">
            <Popover v-slot="{ open }" class="relative">
              <PopoverButton :class="[open ? 'text-gray-900' : 'text-gray-500', 'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2']">
                <span>Solutions</span>
                <ChevronDownIcon :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']" aria-hidden="true" />
              </PopoverButton>

              <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
                <PopoverPanel class="max-w-md mt-3 -ml-4 w-screen transform z-10 absolute lg:ml-0 lg:max-w-2xl lg:left-1/2 lg:-translate-x-1/2">
                  <div class="rounded-lg shadow-lg ring-black ring-1 ring-opacity-5 overflow-hidden">
                    <div class="bg-white grid py-6 px-5 gap-6 relative sm:p-8 sm:gap-8 lg:grid-cols-2">
                      <a v-for="item in solutions" :key="item.name" :href="item.href" class="rounded-lg flex -m-3 p-3 items-start hover:bg-gray-50">
                        <div class="bg-gradient-to-r rounded-md flex from-purple-600 to-indigo-600 flex-shrink-0 h-10 text-white w-10 items-center justify-center sm:h-12 sm:w-12">
                          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                        </div>
                        <div class="ml-4">
                          <p class="font-medium text-base text-gray-900">{{ item.name }}</p>
                          <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </PopoverPanel>
              </transition>
            </Popover>

            <a href="#" class="font-medium text-base text-gray-500 hover:text-gray-900">Pricing</a>
            <a href="#" class="font-medium text-base text-gray-500 hover:text-gray-900">Partners</a>
            <a href="#" class="font-medium text-base text-gray-500 hover:text-gray-900">Company</a>
          </PopoverGroup>
          <div class="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
            <!-- <a href="#" class="font-medium text-base text-gray-500 whitespace-nowrap hover:text-gray-900">Sign in</a> -->
            <a href="/verse" class="bg-gradient-to-r bg-origin-border border border-transparent rounded-md font-medium from-purple-600 to-indigo-600 shadow-sm text-base text-white ml-8 py-2 px-4 inline-flex items-center justify-center whitespace-nowrap hover:from-purple-700 hover:to-indigo-700">Jump Into Verse</a>
          </div>
        </div>

        <transition enter-active-class="duration-200 ease-out" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="duration-100 ease-in" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
          <PopoverPanel focus class="p-2 transform origin-top-right inset-x-0 transition top-0 z-30 absolute md:hidden">
            <div class="bg-white rounded-lg divide-y-2 divide-gray-50 shadow-lg ring-black ring-1 ring-opacity-5">
              <div class="px-5 pt-5 pb-6">
                <div class="flex items-center justify-between">
                  <div>
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?from-color=purple&from-shade=600&to-color=indigo&to-shade=600&toShade=600" alt="Your Company">
                  </div>
                  <div class="-mr-2">
                    <PopoverButton class="bg-white rounded-md p-2 text-gray-400 inline-flex items-center justify-center hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-inset focus:ring-2 focus:ring-indigo-500">
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="mt-6">
                  <nav class="grid gap-7 grid-cols-1">
                    <a v-for="item in solutions" :key="item.name" :href="item.href" class="rounded-lg flex -m-3 p-3 items-center hover:bg-gray-50">
                      <div class="bg-gradient-to-r rounded-md flex from-purple-600 to-indigo-600 flex-shrink-0 h-10 text-white w-10 items-center justify-center">
                        <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="font-medium text-base ml-4 text-gray-900">{{ item.name }}</div>
                    </a>
                  </nav>
                </div>
              </div>
              <div class="py-6 px-5">
                <div class="grid gap-4 grid-cols-2">
                  <a href="#" class="font-medium text-base text-gray-900 hover:text-gray-700">Pricing</a>
                  <a href="#" class="font-medium text-base text-gray-900 hover:text-gray-700">Partners</a>
                  <a href="#" class="font-medium text-base text-gray-900 hover:text-gray-700">Company</a>
                </div>
                <div class="mt-6">
                  <a href="#" class="bg-gradient-to-r bg-origin-border border border-transparent rounded-md flex font-medium from-purple-600 to-indigo-600 shadow-sm text-base text-white w-full py-2 px-4 items-center justify-center hover:from-purple-700 hover:to-indigo-700">Sign up</a>
                  <p class="font-medium mt-6 text-center text-base text-gray-500">
                    Existing customer?
                    <a href="#" class="text-gray-900">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </header>

    <main>
      <!-- Hero section -->
      <div class="relative">
        <div class="bg-gray-100 h-1/2 inset-x-0 bottom-0 absolute" />
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div class="shadow-xl relative sm:rounded-2xl sm:overflow-hidden">
            <div class="inset-0 absolute">
              <img class="h-full object-cover w-full" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops">
              <div class="bg-gradient-to-r from-purple-800 to-indigo-700 inset-0 absolute mix-blend-multiply" />
            </div>
            <div class="py-16 px-4 relative sm:py-24 sm:px-6 lg:py-32 lg:px-8">
              <h1 class="font-bold text-center tracking-tight text-4xl sm:text-5xl lg:text-6xl">
                <span class="text-white block">Your all in one</span>
                <span class="text-indigo-200 block">Web3 Space</span>
              </h1>
              <p class="mx-auto max-w-lg mt-6 text-center text-xl text-indigo-200 sm:max-w-3xl">
                MassVerse.Space is a Web3 native social platform built on all Web3 Tech.
              </p>
              <div class="mx-auto max-w-sm mt-10 sm:flex sm:max-w-none sm:justify-center">
                <div class="flex space-y-4 justify-center sm:mx-auto sm:space-y-0 sm:gap-5 sm:inline-grid">
                  <a href="/verse" class="bg-white border border-transparent rounded-md flex font-medium shadow-sm text-base py-3 px-4 text-indigo-700 items-center justify-center sm:px-8 hover:bg-indigo-50">Get started</a>
                  <!-- <a href="#" class="border border-transparent rounded-md flex font-medium bg-indigo-500 bg-opacity-60 shadow-sm text-base text-white py-3 px-4 items-center justify-center sm:px-8 hover:bg-opacity-70">Live demo</a> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Logo Cloud -->
      <div class="bg-gray-100">
        <div class="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <p class="font-semibold text-center text-base text-gray-500">
            Trusted by over 5 very average small DAOs
          </p>
          <div class="mt-6 grid gap-8 grid-cols-2 md:grid-cols-6 lg:grid-cols-5">
            <div class="flex col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple">
            </div>
            <div class="flex col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img class="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage">
            </div>
            <div class="flex col-span-1 justify-center md:col-span-2 lg:col-span-1">
              <img class="h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit">
            </div>
            <div class="flex col-span-1 justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
              <img class="h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor">
            </div>
            <div class="flex col-span-2 justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
              <img class="h-12" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation">
            </div>
          </div>
        </div>
      </div>

      <!-- Alternating Feature Sections -->
      <div class="pt-16 pb-32 relative overflow-hidden">
        <div aria-hidden="true" class="bg-gradient-to-b from-gray-100 h-48 inset-x-0 top-0 absolute" />
        <div class="relative">
          <div class="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:px-8 lg:gap-24 lg:grid-cols-2">
            <div class="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-none lg:mx-0 lg:py-16 lg:px-0">
              <div>
                <div>
                  <span class="bg-gradient-to-r rounded-md flex from-purple-600 to-indigo-600 h-12 w-12 items-center justify-center">
                    <InboxIcon class="h-6 text-white w-6" aria-hidden="true" />
                  </span>
                </div>
                <div class="mt-6">
                  <h2 class="font-bold tracking-tight text-3xl text-gray-900">
                    Stay on top of Web3 chat flow
                  </h2>
                  <p class="mt-4 text-lg text-gray-500">
                    All chat base on famous LibP2P, all in Web3, all for decentralized citiens.
                  </p>
                  <div class="mt-6">
                    <a href="/verse" class="bg-gradient-to-r bg-origin-border border border-transparent rounded-md font-medium from-purple-600 to-indigo-600 shadow-sm text-base text-white py-2 px-4 inline-flex hover:from-purple-700 hover:to-indigo-700">Get started</a>
                  </div>
                </div>
              </div>
              <div class="border-t border-gray-200 mt-8 pt-6">
                <blockquote>
                  <div>
                    <p class="text-base text-gray-500">
                      &ldquo;A cool space for me to meet other web3 citizens.&rdquo;
                    </p>
                  </div>
                  <footer class="mt-3">
                    <div class="flex space-x-3 items-center">
                      <div class="flex-shrink-0">
                        <img class="rounded-full h-6 w-6" src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80" alt="">
                      </div>
                      <div class="font-medium text-base text-gray-700">
                        Marcia Hill, A web3 designer
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
            <div class="mt-12 sm:mt-16 lg:mt-0">
              <div class="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:h-full lg:m-0 lg:px-0 lg:relative">
                <img class="rounded-xl shadow-xl ring-black w-full ring-1 ring-opacity-5 lg:h-full lg:max-w-none lg:w-auto lg:left-0 lg:absolute" src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg" alt="Inbox user interface">
              </div>
            </div>
          </div>
        </div>
        <div class="mt-24">
          <div class="lg:mx-auto lg:max-w-7xl lg:grid lg:grid-flow-col-dense lg:px-8 lg:gap-24 lg:grid-cols-2">
            <div class="mx-auto max-w-xl px-4 sm:px-6 lg:max-w-none lg:mx-0 lg:py-32 lg:px-0 lg:col-start-2">
              <div>
                <div>
                  <span class="bg-gradient-to-r rounded-md flex from-purple-600 to-indigo-600 h-12 w-12 items-center justify-center">
                    <SparklesIcon class="h-6 text-white w-6" aria-hidden="true" />
                  </span>
                </div>
                <div class="mt-6">
                  <h2 class="font-bold tracking-tight text-3xl text-gray-900">
                    Better understand your customers
                  </h2>
                  <p class="mt-4 text-lg text-gray-500">
                    Semper curabitur ullamcorper posuere nunc sed. Ornare iaculis bibendum malesuada faucibus lacinia porttitor. Pulvinar laoreet sagittis viverra duis. In venenatis sem arcu pretium pharetra at. Lectus viverra dui tellus ornare pharetra.
                  </p>
                  <div class="mt-6">
                    <a href="#" class="bg-gradient-to-r bg-origin-border border border-transparent rounded-md font-medium from-purple-600 to-indigo-600 shadow-sm text-base text-white py-2 px-4 inline-flex hover:from-purple-700 hover:to-indigo-700">Get started</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
              <div class="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:h-full lg:m-0 lg:px-0 lg:relative">
                <img class="rounded-xl shadow-xl ring-black w-full ring-1 ring-opacity-5 lg:h-full lg:max-w-none lg:w-auto lg:right-0 lg:absolute" src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg" alt="Customer profile user interface">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Gradient Feature Section -->
      <div class="bg-gradient-to-r from-purple-800 to-indigo-700">
        <div class="mx-auto max-w-4xl py-16 px-4 sm:px-6 sm:pt-20 sm:pb-24 lg:max-w-7xl lg:px-8 lg:pt-24">
          <h2 class="font-bold text-white tracking-tight text-3xl">
            Inbox support built for efficiency
          </h2>
          <p class="mt-4 text-lg max-w-3xl text-purple-200">
            Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis. Blandit aliquam sit nisl euismod mattis in.
          </p>
          <div class="mt-12 grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:mt-16 lg:gap-x-8 lg:gap-y-16 lg:grid-cols-4">
            <div v-for="feature in features" :key="feature.name">
              <div>
                <span class="bg-white rounded-md flex bg-opacity-10 h-12 w-12 items-center justify-center">
                  <component :is="feature.icon" class="h-6 text-white w-6" aria-hidden="true" />
                </span>
              </div>
              <div class="mt-6">
                <h3 class="font-medium text-lg text-white">
                  {{ feature.name }}
                </h3>
                <p class="mt-2 text-base text-purple-200">
                  {{ feature.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats section -->
      <div class="bg-gray-900 relative">
        <div class="h-80 inset-x-0 bottom-0 absolute xl:h-full xl:top-0">
          <div class="h-full w-full xl:grid xl:grid-cols-2">
            <div class="h-full xl:col-start-2 xl:relative">
              <img class="h-full object-cover w-full opacity-25 xl:inset-0 xl:absolute" src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" alt="People working on laptops">
              <div aria-hidden="true" class="bg-gradient-to-b from-gray-900 h-32 inset-x-0 top-0 absolute xl:bg-gradient-to-r xl:h-full xl:inset-y-0 xl:left-0 xl:w-32" />
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:gap-x-8 xl:grid-cols-2">
          <div class="pt-12 pb-64 relative sm:pt-24 sm:pb-64 xl:pb-24 xl:col-start-1">
            <h2 class="font-semibold text-base">
              <span class="bg-gradient-to-r bg-clip-text from-purple-300 to-indigo-300 text-transparent">Valuable Metrics</span>
            </h2>
            <p class="font-bold mt-3 text-white tracking-tight text-3xl">
              Get actionable data that will help grow your business
            </p>
            <p class="mt-5 text-lg text-gray-300">
              Rhoncus sagittis risus arcu erat lectus bibendum. Ut in adipiscing quis in viverra tristique sem. Ornare feugiat viverra eleifend fusce orci in quis amet. Sit in et vitae tortor, massa. Dapibus laoreet amet lacus nibh integer quis. Eu vulputate diam sit tellus quis at.
            </p>
            <div class="mt-12 grid gap-y-12 gap-x-6 grid-cols-1 sm:grid-cols-2">
              <p v-for="item in metrics" :key="item.id">
                <span class="font-bold text-white text-2xl block">{{ item.stat }}</span>
                <span class="mt-1 text-base text-gray-300 block"><span class="font-medium text-white">{{ item.emphasis }}</span> {{ item.rest }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="bg-white">
        <div class="mx-auto max-w-4xl py-16 px-4 sm:py-24 sm:px-6 lg:flex lg:max-w-7xl lg:px-8 lg:items-center lg:justify-between">
          <h2 class="font-bold tracking-tight text-4xl text-gray-900 sm:text-4xl">
            <span class="block">Ready to get started?</span>
            <span class="bg-gradient-to-r bg-clip-text from-purple-600 to-indigo-600 text-transparent -mb-1 pb-1 block">Get in touch or create an account.</span>
          </h2>
          <div class="space-y-4 mt-6 sm:flex sm:space-y-0 sm:space-x-5">
            <a href="#" class="bg-gradient-to-r bg-origin-border border border-transparent rounded-md flex font-medium from-purple-600 to-indigo-600 shadow-sm text-base text-white py-3 px-4 items-center justify-center hover:from-purple-700 hover:to-indigo-700">Learn more</a>
            <a href="#" class="border border-transparent rounded-md flex font-medium bg-indigo-50 shadow-sm text-base py-3 px-4 text-indigo-800 items-center justify-center hover:bg-indigo-100">Get started</a>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">
        Footer
      </h2>
      <div class="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
        <div class="xl:grid xl:gap-8 xl:grid-cols-3">
          <div class="grid gap-8 grid-cols-2 xl:col-span-2">
            <div class="md:grid md:gap-8 md:grid-cols-2">
              <div>
                <h3 class="font-medium text-base text-gray-900">
                  Solutions
                </h3>
                <ul role="list" class="space-y-4 mt-4">
                  <li v-for="item in footerNavigation.solutions" :key="item.name">
                    <a :href="item.href" class="text-base text-gray-500 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="font-medium text-base text-gray-900">
                  Support
                </h3>
                <ul role="list" class="space-y-4 mt-4">
                  <li v-for="item in footerNavigation.support" :key="item.name">
                    <a :href="item.href" class="text-base text-gray-500 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:gap-8 md:grid-cols-2">
              <div>
                <h3 class="font-medium text-base text-gray-900">
                  Company
                </h3>
                <ul role="list" class="space-y-4 mt-4">
                  <li v-for="item in footerNavigation.company" :key="item.name">
                    <a :href="item.href" class="text-base text-gray-500 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-12 md:mt-0">
                <h3 class="font-medium text-base text-gray-900">
                  Legal
                </h3>
                <ul role="list" class="space-y-4 mt-4">
                  <li v-for="item in footerNavigation.legal" :key="item.name">
                    <a :href="item.href" class="text-base text-gray-500 hover:text-gray-900">{{ item.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="mt-12 xl:mt-0">
            <h3 class="font-medium text-base text-gray-900">
              Subscribe to our newsletter
            </h3>
            <p class="mt-4 text-base text-gray-500">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
            <form class="mt-4 sm:flex sm:max-w-md">
              <label for="email-address" class="sr-only">Email address</label>
              <input id="email-address" type="email" name="email-address" autocomplete="email" required="" class="bg-white border rounded-md border-gray-300 shadow-sm text-base w-full min-w-0 py-2 px-4 placeholder-gray-500 text-gray-900 appearance-none focus:outline-none focus:border-indigo-500 focus:placeholder-gray-400 focus:ring-indigo-500" placeholder="Enter your email">
              <div class="rounded-md mt-3 sm:flex-shrink-0 sm:mt-0 sm:ml-3">
                <button type="submit" class="bg-gradient-to-r bg-origin-border border border-transparent rounded-md flex font-medium from-purple-600 to-indigo-600 shadow-sm text-base text-white w-full py-3 px-4 items-center justify-center hover:from-purple-700 hover:to-indigo-700">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="border-t border-gray-200 mt-12 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
          <div class="flex space-x-6 md:order-2">
            <a v-for="item in footerNavigation.social" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <p class="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { defineComponent, h } from 'vue'
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/vue'
import {
  ArrowUturnLeftIcon,
  Bars3Icon,
  ChatBubbleBottomCenterTextIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleLeftRightIcon,
  DocumentChartBarIcon,
  HeartIcon,
  InboxIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  TrashIcon,
  UsersIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'

const solutions = [
  {
    name: 'Verse',
    description: 'Your MassVerse Space Here',
    href: '/verse',
    icon: UsersIcon,
  },
  {
    name: 'Web3 Chat',
    description: 'A fully web3 chat module.',
    href: '/chat/messages',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  // {
  //   name: 'Live Chat',
  //   description: 'Your customers\' data will be safe and secure.',
  //   href: '#',
  //   icon: ChatBubbleLeftRightIcon,
  // },
  // {
  //   name: 'Knowledge Base',
  //   description: 'Connect with third-party tools that you\'re already using.',
  //   href: '#',
  //   icon: QuestionMarkCircleIcon,
  // },
]
const features = [
  {
    name: 'Unlimited Inboxes',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: InboxIcon,
  },
  {
    name: 'Manage Team Members',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: UsersIcon,
  },
  {
    name: 'Spam Report',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: TrashIcon,
  },
  {
    name: 'Compose in Markdown',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: PencilSquareIcon,
  },
  {
    name: 'Team Reporting',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: DocumentChartBarIcon,
  },
  {
    name: 'Saved Replies',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ArrowUturnLeftIcon,
  },
  {
    name: 'Email Commenting',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: ChatBubbleLeftEllipsisIcon,
  },
  {
    name: 'Connect with Customers',
    description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    icon: HeartIcon,
  },
]
const metrics = [
  { id: 1, stat: '8K+', emphasis: 'Companies', rest: 'use laoreet amet lacus nibh integer quis.' },
  { id: 2, stat: '25K+', emphasis: 'Countries around the globe', rest: 'lacus nibh integer quis.' },
  { id: 3, stat: '98%', emphasis: 'Customer satisfaction', rest: 'laoreet amet lacus nibh integer quis.' },
  { id: 4, stat: '12M+', emphasis: 'Issues resolved', rest: 'lacus nibh integer quis.' },
]
const footerNavigation = {
  solutions: [
    { name: 'Marketing', href: '#' },
    { name: 'Analytics', href: '#' },
    { name: 'Commerce', href: '#' },
    { name: 'Insights', href: '#' },
  ],
  support: [
    { name: 'Pricing', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Guides', href: '#' },
    { name: 'API Status', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Partners', href: '#' },
  ],
  legal: [
    { name: 'Claim', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
            }),
          ]),
      }),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
    {
      name: 'Dribbble',
      href: '#',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              'd': 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
  ],
}
</script>

<style lang="stylus">
body{
  overflow: auto!important;
}

</style>
