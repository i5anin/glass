export const statuses = [
  {
    suffix: '_cal',
    badgeClass: 'bg-danger',
    label: 'К',
    description: 'Требуется расчет цены калибров и времени поставки',
  },
  {
    suffix: '_instr',
    badgeClass: 'bg-warning',
    label: 'И',
    description: 'Требуется расчет цены инструмента и времени поставки',
  },
  {
    suffix: '_draft',
    badgeClass: 'bg-secondary',
    label: 'Ч',
    description: 'Информация по номенклатуре заполнена не полностью',
  },
  {
    suffix: '_metall',
    badgeClass: 'bg-dark',
    label: 'М',
    description: 'Требуется расчет цены материала и времени поставки',
  },
  {
    suffix: '_kp',
    badgeClass: 'bg-success',
    label: 'КП',
    description:
      'Готово к выставлению коммерческого предложения (все данные предоставлены)',
  },
  {
    suffix: '_p',
    badgeClass: 'bg-success',
    label: 'П',
    description: 'В производстве',
  },
  {
    suffix: '_sles',
    badgeClass: 'bg-warning',
    label: 'С',
    description: 'На слесарной обработке',
  },
  {
    //зачеркивается
    suffix: '_otgruzka', //но этот элемент нужен
    badgeClass: 'bg-success',
    label: '', //лейбл скрыт
    description: 'Отгрузка',
  },
  {
    suffix: '_zagotovka',
    badgeClass: 'bg-success',
    label: 'З',
    description: 'Требуется заготовка',
  },
  {
    suffix: '_oplata',
    badgeClass: 'bg-danger',
    label: 'О',
    description: 'Нет информации об оплате',
  },
  {
    suffix: '_cal_zakupka',
    badgeClass: 'bg-info',
    label: 'К',
    description: 'Требуется закупка калибров',
  },
  {
    suffix: '_instr_zakupka',
    badgeClass: 'bg-warning',
    label: 'И',
    description: 'Требуется закупка инструмента',
  },
  {
    suffix: '_metall_zakupka',
    badgeClass: 'bg-dark',
    label: 'М',
    description: 'Требуется закупка металла',
  },
]
