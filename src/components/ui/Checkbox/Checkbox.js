import './Checkbox.scss'

export const Checkbox = (props) => {
  const { label, id, name, value, checked, className } = props;
  const getMarkup = () => {
    return `<label class="ui-checkbox">
              <span class="ui-check__label">${label}</span>
              <input id="${id}" name="${name}" value="${value ?? ''}" class="ui-checkbox__input ${className ? className : ''}" type="checkbox" ${checked && 'checked'}>
              <span class="ui-checkbox__box"></span>
            </label>`
  }

  const render = () => {
    const template = document.createElement('template');
    template.innerHTML = getMarkup();
    return template.content
  }

  return { getMarkup, render }
}