import { ru } from 'date-fns/locale'

const customRuLocale = {
  ...ru,
  localize: {
    ...ru.localize,
    day: (day) => {
      const days = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']
      return days[day]
    },
  },
}

export default customRuLocale
