import './Select.scss';

let selectCounter = 0;

export const Select = ({ items, className, placeholder, onChange, name, value, required }) => {
  const id = `select-${selectCounter++}`;
  let filteredItems = items;

  const createOption = (item) => {
    const option = `<div class='ui-select__option' data-value="${item.value}">${item.text}</div>`;
    return option;
  };

  const createOptions = () => {
    const options = filteredItems?.map(item => createOption(item)).join('');
    return options;
  };


  const getMarkup = () => {
    return `
      <div class="ui-select ${className}" id='${id}'>
        <div class='ui-select__container'>
          <input name='${name}' placeholder="${placeholder ?? 'Поиск'}" value="${value ?? ''}" ${required ? 'required' : ''} class='ui-input ui-select__input' />
        <div class='ui-select__value'></div> 
            </div >
        <div class="ui-select__options">
          ${createOptions()}
        </div>
      </div >`;
  };

  const render = () => {
    const template = document.createElement('template');
    template.innerHTML = getMarkup();

    const select = template.content.querySelector('.ui-select');
    const options = select.querySelector('.ui-select__options');
    const input = select.querySelector('.ui-input');

    input.addEventListener('focus', (event) => {
      options.classList.add('ui-select__options_active');

      select.querySelectorAll('.ui-select__option').forEach(elem => {
        elem.classList.toggle('ui-select__option_selected', elem.innerHTML === event.target.value);
      });
    });


    input.addEventListener('input', function (event) {
      const value = event.target.value;
      const filteredOptions = filteredItems.filter(item => item.text.includes(value));
      options.innerHTML = filteredOptions.map(item => createOption(item)).join('');
    });

    options.addEventListener('click', function (event) {
      const target = event.target;
      const option = target.closest('.ui-select__option');
      if (option) {
        value = option.dataset.value;
        input.value = option.textContent;

        select.querySelectorAll('.ui-select__option').forEach(elem => {
          elem.classList.toggle('ui-select__option_selected', elem === option);
        });

        select.dispatchEvent(new Event('change'))
      }
      options.classList.remove('ui-select__options_active');
    });

    document.addEventListener('click', event => {
      if (!select.contains(event.target)) {
        options.classList.remove('ui-select__options_active');
      }
    });

    select.addEventListener('change', (event) => {
      onChange && onChange(event)
    })

    return template.content;
  };

  const setItems = (newItems) => {
    filteredItems = newItems;
    const select = document.getElementById(id);
    const newSelect = render()
    newSelect.querySelector('.ui-input').value = ''
    select.parentNode.replaceChild(newSelect, select)
  }

  const getValue = () => {
    return value
  }
  return { render, setItems, getValue };
};
