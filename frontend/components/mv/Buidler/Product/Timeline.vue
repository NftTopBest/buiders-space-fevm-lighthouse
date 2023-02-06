<script setup lang="ts">
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from '@heroicons/vue/20/solid'
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: HandThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' },
}
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20',
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22',
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28',
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30',
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04',
  },
]
</script>
<template>
  <section aria-labelledby="timeline-title">
    <div class="bg-white">
      <h2 id="timeline-title" class="font-medium pt-4 text-2xl text-gray-900">
        Timeline
      </h2>
      <div class="mt-6 flow-root">
        <ul role="list" class="-mb-8">
          <li v-for="(item, itemIdx) in timeline" :key="item.id">
            <div class="pb-8 relative">
              <span v-if="itemIdx !== timeline.length - 1" class="h-full -ml-px bg-gray-200 top-4 left-4 w-0.5 absolute" aria-hidden="true" />
              <div class="flex space-x-3 relative">
                <div>
                  <span :class="[item.type.bgColorClass, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white']">
                    <component :is="item.type.icon" class="h-5 text-white w-5" aria-hidden="true" />
                  </span>
                </div>
                <div class="flex space-x-4 flex-1 min-w-0 pt-1.5 justify-between">
                  <div>
                    <p class="text-sm text-gray-500">
                      {{ item.content }} <a href="#" class="font-medium text-gray-900">{{ item.target }}</a>
                    </p>
                  </div>
                  <div class="text-right text-sm text-gray-500 whitespace-nowrap">
                    <time :datetime="item.datetime">{{ item.date }}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
