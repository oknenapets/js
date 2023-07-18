import { TextInfo } from "../TextInfo/TextInfo.js"
import { Checkbox } from "../ui/Checkbox/Checkbox.js"
import { ItemForm } from "../ItemForm/ItemForm.js"
import "../ui/Modal/Modal.js"

import './Item.scss'

export const Item = (props) => {
  const { name, diagonal, materials, battery, price, id, ram, mem, screen } = props

  const info = [
    { title: 'Диагональ экрана, дюймы', value: diagonal, additional: false },
    { title: 'Основной материал корпуса', value: materials?.join(' '), additional: false },
    { title: 'Емкость аккумулятора, мАч', value: battery, additional: false },
    { title: 'Объем оперативной памяти, ГБ', value: ram, additional: true },
    { title: 'Объем памяти, ГБ', value: mem, additional: true },
    { title: 'Разрешение экрана', value: screen, additional: true },
  ];
  
  const getMarkup = () => {
    return `<div class="item" data-ref='${id}'>
              <div class="item__img-container">
                <img class='item__img' src="https://i.imgur.com/hW5BfD7.png" />
              </div>
              <div class="item__info">
                <a class="ui-link item__name" href="#">${name}
                </a>
                ${info
        .filter(item => !item.additional)
        .map(item => item && TextInfo(item).getMarkup()).join('')}
                <div class="item__info_additional hidden">
                ${info
        .filter(item => item.additional)
        .map(item => item && TextInfo(item).getMarkup()).join('')}
                </div>
                <div class="item__select">
                  ${Checkbox({ label: 'Выбрать',className:'item__checkbox' }).getMarkup()}
                </div>
              </div>
              <span class="item__price">
                ${Number(price).toLocaleString('fullwide')} ₽
              </span>
              <div class="item__buttons">
                <buttton class="ui-button item__button_edit">
                  Редактировать
                </buttton>
                <button class="ui-button item__button_expand">
                  Подробнее
                </button>
                <buttton class="ui-button item__button_delete">
                  Удалить
                </buttton>
              </div>
            </div>`
  }

  const updateItem = (value) => {
    const item = document.querySelector(`[data-ref="${id}"]`)
    item.parentNode.replaceChild(Item(value).render(), item)
  }

  const onDeleteClick = () => {
    document.querySelector(`[data-ref="${id}"]`).remove()
  }

  const expandInfo = () => {
    const item = document.querySelector(`[data-ref="${id}"]`);
    const additionalInfoBlock = item.querySelector('.item__info_additional');
    additionalInfoBlock.classList.toggle('hidden');
    item.querySelector('.item__button_expand').innerText = additionalInfoBlock.classList.contains('hidden') ? 'Подробнее' : 'Свернуть'
  }

  const render = () => {
    const template = document.createElement('template');
    template.innerHTML = getMarkup();

    template.content.querySelector('.item__button_delete').addEventListener('click', onDeleteClick)
    template.content.querySelector('.item__button_edit').addEventListener('click', () => {
      modal.update(ItemForm({ initialValue: props, isEdit: true, afterEdit: updateItem }).render())
    })
    template.content.querySelector('.item__button_expand').addEventListener('click', expandInfo)

    return template.content
  }

  return { render }
}
