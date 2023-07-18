export const TextInfo = ({ title, value }) => {

  const getMarkup = () => {
    return `<div>
        ${title}:
        <span>${value}</span>
      </div>`
  }

  const render = () => {
    const template = document.createElement('template');
    template.innerHTML = getMarkup();
    return document.importNode(template.content, true)
  }

  return { getMarkup, render }
}