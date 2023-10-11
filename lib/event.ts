export function onOptionSelect(
    target: HTMLSelectElement,
    options: HTMLLIElement[],
    signal: AbortSignal,
    closeDropdown: () => void
) {
    options.forEach((option) => {
        option.addEventListener(
            'click',
            () => {
                const { value } = option.dataset;

                if (value) {
                    target.value = value;

                    target.dispatchEvent(new Event('change'));

                    closeDropdown();
                }
            },
            { signal }
        );
    });
}

export function onSelectChange(
    element: HTMLSelectElement,
    signal: AbortSignal,
    render: () => void
) {
    element.addEventListener(
        'change',
        () => {
            render();
        },
        { signal }
    );
}

export function clickOutside(
    element: HTMLElement,
    signal: AbortSignal,
    closeDropdown: () => void
) {
    document.addEventListener(
        'click',
        (event) => {
            const target = event.target as HTMLElement;

            if (!element.contains(target)) {
                closeDropdown();
            }
        },
        { signal }
    );
}

export function onInputClick(
    element: HTMLElement,
    signal: AbortSignal,
    callback: () => void
) {
    element.addEventListener('click', callback, { signal });
}
