import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#ff4081"
        }
    }
})

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#90caf9"
        },
        secondary: {
            main: "#f48fb1"
        }
    }
})

const Themes = [
    { theme: lightTheme, name: "lightMode" },
    { theme: darkTheme, name: "darkMode" }
]


const getCurrentTheme = () => {
    let themeName = localStorage.getItem("dreamBidTheme");
    if (themeName === null) return Themes[0];
    let currentTheme = Themes.filter(theme => theme.name === themeName)[0]
    if (currentTheme) return currentTheme;
    return Themes[0];
}

const saveCurrentTheme = (themeName) => {
    let themeObject = Themes.filter(theme => theme.name === themeName)[0];
    if (!themeObject) themeObject = Themes[0];
    localStorage.setItem("dreamBidTheme", themeObject.name);
    return themeObject;
}
export { saveCurrentTheme, getCurrentTheme }
export default Themes;