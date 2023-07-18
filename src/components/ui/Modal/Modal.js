import './Modal.scss'

export const Modal = () => {
  const getMarkup = () => {
    return `<div id="modal" class="ui-modal">
              <div class="ui-modal__body">
                <span class="ui-modal__close">&times;</span>
                <div class='ui-modal__content'></div>
              </div>
            </div>`
  }

  const close = () => {
    document.getElementById('modal').classList.remove('ui-modal_active')
  }

  const update = (element) => {
    const item = document.getElementById('modal').querySelector(".ui-modal__content")
    if (!item.children.length) item.appendChild(element)
    else if (element) item.replaceChildren(element)
    document.getElementById('modal').classList.add('ui-modal_active')
  }

  const render = () => {
    if (document.getElementById('modal')) return;

    const template = document.createElement('template');
    template.innerHTML = getMarkup();

    template.content.querySelector('.ui-modal__close').addEventListener('click', close)
    template.content.querySelector('.ui-modal').addEventListener('click', function (event) { event.target === this && close() })

    return template.content
  }

  return { render, update, close }
}

window.modal = Modal()