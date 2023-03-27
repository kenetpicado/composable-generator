export function useFormat() {
    function capitalize(string) {
        if (!string) return "";

        return (
            string.toLowerCase().charAt(0).toUpperCase() +
            string.toLowerCase().slice(1)
        );
    }

    function toPlural(string) {
        switch (true) {
            case !string:
                return "";

            case string.endsWith("x"):
            case string.endsWith("ch"):
            case string.endsWith("sh"):
            case string.endsWith("ss"):
            case string.endsWith("o"):
                return string + "es";

            case string.endsWith("y"):
                return string.slice(0, -1) + "ies";

            case string.endsWith("s"):
                return string;

            default:
                return string + "s";
        }
    }

    return { capitalize, toPlural };
}
