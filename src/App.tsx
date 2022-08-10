import styled, { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { darktheme,whitetheme } from "./Theme";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon,faSun } from '@fortawesome/free-solid-svg-icons'

const GlobalStyle = createGlobalStyle`

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center, dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-style: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}

body {
  line-height: 1;
}

menu, ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

*{
    box-sizing: border-box;
}

body {
  background-color:${(props) => props.theme.bgColor};
  color:${(props) => props.theme.textColor};
  line-height: 1.2;
}

a{
    text-decoration: none;
    color:inherit
}
`;
const NavigationContainer = styled.div`
  position:fixed;
  top:25px;
  left:25px;
`

const NavigationBorder = styled.div`
  width:55px;
  height:55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props)=>props.theme.ItemBgColor};
  color: ${(props)=>props.theme.IconColor};
  &:hover{
    font-size:24px;
    transition: all 0.1s;
  }
  cursor: pointer;
`
function App() {

  const [iconChange,setIconChange] = useState(true);
  
  function toggleButton(){
    setIconChange((current)=>!current)
  }

  return (
    <>
    <ThemeProvider theme={iconChange ? darktheme : whitetheme}>
      <GlobalStyle />
      <HelmetProvider>
        <NavigationContainer onClick={()=>toggleButton()}>
          <NavigationBorder>
            {
            iconChange ? <FontAwesomeIcon icon={faMoon} size="2x" /> : <FontAwesomeIcon icon={faSun} size="2x"></FontAwesomeIcon> 
            }
          </NavigationBorder>
        </NavigationContainer>
        <Router/>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={true} />
    </ThemeProvider>

    </>
  );
}

export default App;
