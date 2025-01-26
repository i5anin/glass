import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import {
  faCalendarDays,
  faXmark,
  faPlus,
  faMinus,
  faCubes,
  faCube,
  faCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'

// Добавляем необходимые иконки в библиотеку
const icons = [
  faXmark,
  faCalendarDays,
  faPlus,
  faMinus,
  faCubes,
  faCube,
  faCalendar,
  faCircle,
  faInfoCircle,
]

library.add(...icons)

export { FontAwesomeIcon }
