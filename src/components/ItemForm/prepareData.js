export const prepareData = (data) => {
  return ({
    id: Date.now(),
    name: `${data.brand} ${data.model}`,
    diagonal: data.screen_size,
    materials: [
      data.glass ? 'Стекло' : '',
      data.plastic ? 'Пластик' : '',
      data.aluminum ? 'Алюминий' : ''
    ],
    battery: data.battery_capacity,
    price: data.price,
    ram: data.ram_capacity,
    screen:data.screen_resolution,
    mem:data.mem_capacity,
  })
}