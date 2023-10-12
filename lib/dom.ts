import { Options } from './main';
import { ParseData } from './parse';

export function build(
    target: HTMLSelectElement,
    data: ParseData,
    options: Options
) {
    const { dom } = options;

    const wrapper = createWrapper();

    const input = createInput();

    const currentValue = createCurrentValue(data);

    const button = createButton(dom.button.html);

    const dropdown = createDropdown();

    const list = createList();

    const selectOptions = createSelectOptions(data);

    list.append(...selectOptions);

    dropdown.append(list);

    input.append(currentValue, button);

    wrapper.append(input, dropdown);

    const parent = target.parentElement;

    if (parent) {
        parent.insertBefore(wrapper, target);
    }

    if (dom.hideOriginal) {
        target.style.display = 'none';
    }

    function render() {
        const { value } = target;

        selectOptions.forEach((option) => {
            const { dataset } = option;

            if (dataset.value === value) {
                option.classList.add('selectricity__item--selected');

                currentValue.textContent = option.textContent ?? '';
            } else {
                option.classList.remove('selectricity__item--selected');
            }
        });
    }

    return { wrapper, selectOptions, input, button, render };
}

function createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('selectricity');

    return wrapper;
}

function createInput() {
    const input = document.createElement('div');
    input.classList.add('selectricity__input');

    return input;
}

function createCurrentValue(data: ParseData) {
    const currentValue = document.createElement('span');
    currentValue.classList.add('selectricity__current-value');

    const selectedOption = data.options.find(
        (option) => option.value === data.selected
    );

    currentValue.textContent = selectedOption?.text ?? '';

    return currentValue;
}

function createButton(html: string | { open: string; close: string }) {
    const button = document.createElement('button');
    button.classList.add('selectricity__button');

    if (typeof html === 'string') {
        button.innerHTML = html;
    } else {
        button.innerHTML = html.open;
    }

    return button;
}

function createDropdown() {
    const dropdown = document.createElement('div');
    dropdown.classList.add('selectricity__dropdown');

    return dropdown;
}

function createList() {
    const list = document.createElement('ul');
    list.classList.add('selectricity__list');

    return list;
}

function createSelectOptions(data: ParseData) {
    const listItems = data.options.map((option) => {
        const { text, value } = option;

        const selected = data.selected === value;

        const listItem = createListItem(text, value, selected);

        return listItem;
    });

    return listItems;
}

function createListItem(text: string, value: string, selected: boolean) {
    const listItem = document.createElement('li');
    listItem.classList.add('selectricity__item');

    if (selected) {
        listItem.classList.add('selectricity__item--selected');
    }

    listItem.dataset.value = value;

    listItem.textContent = text;

    return listItem;
}

/**
 *  <div class="selectricity">
            <div class="selectricity__input">
                <span class="selectricity__current-value">Option 1</span>
                <button class="selectricity__button">X</button>
            </div>

            <div class="selectricity__dropdown">
                <ul class="selectricity__list">
                    <li class="selectricity__item">Option 1</li>
                    <li class="selectricity__item">Option 2</li>
                </ul>
            </div>
        </div>
 */
