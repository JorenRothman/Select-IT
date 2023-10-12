import { build } from './dom';
import {
    clickOutside,
    onInputClick,
    onOptionSelect,
    onSelectChange,
} from './event';
import { parse } from './parse';
import './style.css';
import merge from 'deepmerge';

export type Options = {
    dom: {
        hideOriginal?: boolean;
        button: {
            html: string | { open: string; close: string };
        };
    };
};

export type State = {
    isOpen: boolean;
};

const defaultOptions: Options = {
    dom: {
        hideOriginal: true,
        button: {
            html: 'X',
        },
    },
};

export default function selectricity(
    element: HTMLSelectElement,
    options: Options = defaultOptions
) {
    options = merge(defaultOptions, options);

    // Abort controller
    // Used to clean up all event listeners
    const abortController = new AbortController();
    const { signal } = abortController;

    const data = parse(element);

    const { wrapper, selectOptions, input, button, render } = build(
        element,
        data,
        options
    );

    function isDropdownOpen() {
        return wrapper.classList.contains('selectricity--open');
    }

    function openDropdown() {
        wrapper.classList.add('selectricity--open');

        if (typeof options.dom.button.html !== 'string') {
            button.innerHTML = options.dom.button.html.close;
        }
    }

    function closeDropdown() {
        wrapper.classList.remove('selectricity--open');

        if (typeof options.dom.button.html !== 'string') {
            button.innerHTML = options.dom.button.html.open;
        }
    }

    onInputClick(input, signal, () => {
        if (isDropdownOpen()) {
            closeDropdown();
        } else {
            openDropdown();
        }
    });

    clickOutside(wrapper, signal, closeDropdown);

    onOptionSelect(element, selectOptions, signal, closeDropdown);

    onSelectChange(element, signal, render);

    // Return methods
    return {
        destroy() {
            abortController.abort();
        },
        reInit() {
            this.destroy();
            selectricity(element, options);
        },
    };
}

// For testing
const element = document.getElementById('test') as HTMLSelectElement;

selectricity(element, {
    dom: {
        hideOriginal: false,
        button: {
            html: '<span>X</span>',
        },
    },
});

const element2 = document.getElementById('test2') as HTMLSelectElement;

selectricity(element2, {
    dom: {
        button: {
            html: {
                open: '<span>Open</span>',
                close: '<span>Close</span>',
            },
        },
    },
});
