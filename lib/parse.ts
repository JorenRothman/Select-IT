export type ParseData = {
    options: {
        value: string;
        text: string;
    }[];
    selected: string;
};

export function parse(selectElement: HTMLElement) {
    const data: ParseData = {
        options: [],
        selected: '',
    };

    // Get all options
    const options = selectElement.querySelectorAll('option');

    // Loop over all options
    options.forEach((option) => {
        // Get the value and text of the option
        const { value, text } = option;

        // Check if the option is selected
        if (option.selected) {
            // If it is, set the selected value
            data.selected = value;
        }

        // Add the option to the data
        data.options.push({
            value,
            text,
        });
    });

    return data;
}
