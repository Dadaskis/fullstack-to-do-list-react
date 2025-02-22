const Utilities = {
    printDataDebug(text, data) {
        const isDisabled = false;
        if (isDisabled) {
            // I know it's dumb, but i would like to keep it that way
            return;
        }
        console.log("DEBUG :: " + text);
        console.dir(data, { depth: null, colors: true });
    },
};

export default Utilities;
