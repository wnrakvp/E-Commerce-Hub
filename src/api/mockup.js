const masterdata = {
  skuList: [
    {
      _id: 1,
      productId: 1,
      name: 'tfndn-50',
      image: 'https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw46146d85/images/large/0000102333.jpg',
      desc: 'Tom Ford : Noir de Noir 50 ML',
      isShopee: false,
      isLazada: true
    },
    {
      _id: 2,
      productId: 1,
      name: 'tfndn-100',
      image: 'https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dwa2e15b39/images/large/0000102334.jpg',
      desc: 'Tom Ford : Noir de Noir 100 ML',
      isShopee: true,
      isLazada: true
    },
    {
      _id: 3,
      productId: 1,
      name: 'tfndn-250',
      image: 'https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw42fc54f8/images/large/0000102607.jpg',
      desc: 'Tom Ford : Noir de Noir 250 ML',
      isShopee: false,
      isLazada: true
    },
    {
      _id: 4,
      productId: 2,
      name: 'aventus18n01',
      image: 'https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg',
      desc: 'Batch หายาก ปี 2018',
      isShopee: true,
      isLazada: true
    },
    {
      _id: 5,
      productId: 2,
      name: 'aventus19n01',
      image: 'https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg',
      desc: 'Batch หายาก ปี 2019',
      isShopee: true,
      isLazada: true
    },
    {
      _id: 6,
      productId: 2,
      name: 'aventus20m01',
      image: 'https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg',
      desc: 'Batch ใหม่ ผลิตต้นปี 2020',
      isShopee: true,
      isLazada: true
    },
    {
      _id: 7,
      productId: 2,
      name: 'aventus21p01',
      image: 'https://plummour.com/wp-content/uploads/2021/06/Creed-Aventus-1.jpg',
      desc: 'Batch ใหม่ ผลิตต้นปี 2021',
      isShopee: true,
      isLazada: true
    }
  ],
  productList: [
    {
      _id: 1,
      name: 'Tom Ford : Noir de Noir',
      desc: '"Noir de Noir is dark, sexy and indulgent. Yin collides with Yang featuring black rose, black truffle and patchouli for an intense, sensual awakening."—TOM FORD',
      image: 'https://www.fenwick.co.uk/dw/image/v2/BBKK_PRD/on/demandware.static/-/Sites-fenwick-master-catalog/default/dw46146d85/images/large/0000102333.jpg',
    },
    {
      _id: 2,
      name: 'Creed : Aventus',
      desc: 'Aventus celebrates strength, vision and success, inspired by the dramatic life of war, peace and romance lived by Emperor Napoleon. The bottle is emblazoned with a silver emblem of a horse and rider.',
      image: 'https://fimgs.net/mdimg/perfume/375x500.9828.jpg',
    },
    {
      _id: 3,
      name: 'Jo Malone : Wood Sage & Sea Salt',
      desc: '‘Sea air is mixed with salty and mineral texture of sand and stones. As the scent of driftwood it has natural and fresh sophistication. A complex combination of wood and sea is in its essence. It provides the feeling of freedom and natural spirit.’',
      image: 'https://fimgs.net/mdimg/perfume/375x500.25529.jpg',
    }
  ],
}
function Mockup () {
  // TODO: do some initial things
  return {
    login () {},
    getAllProducts () {
      return Promise.resolve({
        reason: 'OK',
        result: masterdata.productList
      })
    },
    getProduct (id) {
      return Promise.resolve({
        reason: 'OK',
        result: masterdata.productList.find(x => x._id === id)
      })
    },
    getAllSKU () {
      return Promise.resolve({
        reason: 'OK',
        result: masterdata.skuList
      })
    }
  }
}
export default Mockup